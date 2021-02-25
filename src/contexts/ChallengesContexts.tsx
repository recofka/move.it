import { createContext, useState, ReactNode } from 'react';
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
    resetChallenge: ()=>void;
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

    const experienceToNextLevel = Math.pow((level + 1) * 4 ,2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const choosedChallenge = challenges[ramdomChallengeIndex];
        setActiveChallenge(choosedChallenge);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider
            value={{
                startNewChallenge,
                levelUp,
                resetChallenge,
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