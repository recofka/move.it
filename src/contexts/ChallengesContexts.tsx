import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
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
    closeLevelUpModal: () => void;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider(
    { children,
        ...rest
    }: ChallengesProviderProps) {

    //retrieve information from ...rest/cookies if exists show them or show default values
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //Execute once only for Browser Notification
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    //Cookies manupulation
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);

    }

    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        console.log(ramdomChallengeIndex)
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

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengesContext.Provider
            value={{
                startNewChallenge,
                levelUp,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}