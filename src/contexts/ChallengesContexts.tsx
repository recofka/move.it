import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //Execute once only for Browser Notification
    useEffect(() => {
        Notification.requestPermission();
    }, [])
    

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const choosedChallenge = challenges[ramdomChallengeIndex];

        setActiveChallenge(choosedChallenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New Challenge 🎉', {
              body: `Win ${choosedChallenge.amount}xp!`
            })
          }
          console.log("This browser does not support desktop notification");
        
    }


    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                startNewChallenge,
                levelUp,
                resetChallenge,
                completeChallenge,
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}