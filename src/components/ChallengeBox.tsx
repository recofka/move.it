import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import { CountDownContext } from '../contexts/CountDownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountDown } = useContext(CountDownContext);
    
    function handleChallengeSucceed() { 
        completeChallenge();
        resetCountDown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>win {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="challenge" />
                        <strong>New Challenge</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Failed
                            </button>
                        <button
                            type="button"
                            className={styles.challengeCompletedButton}
                            onClick={handleChallengeSucceed}
                        >
                            Completed
                            </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finish a cycle to receive a challenge</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level-up" />
                    Complete challenges and level up
                </p>
                    </div>
                )
            }
        </div >
    );
}