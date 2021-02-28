import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
    let percentoToNextLevel = (Math.round(currentExperience * 100) / experienceToNextLevel);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                {percentoToNextLevel ?
                    <div style={{ width: `${percentoToNextLevel}%` }} />
                    :
                    <div style={{ width: 0 }} />
                }

                <span className={styles.currentExperience} style={{ left: `${percentoToNextLevel}%` }}>
                    {currentExperience} xp
                </span>

            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}
