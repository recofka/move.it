import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountDownProvider } from '../contexts/CountDownContext';
import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContexts';
import { Interface } from 'readline';


interface HomeProps {
  level: Number;
  currentExperience: Number;
  challengesCompleted: Number;
}

export default function Home(props) {
  // console.log(props);
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}

    >
      <div className={styles.container}>
        <Head>
          <title>Home | move.it</title>
        </Head>

        <ExperienceBar />

        <CountDownProvider>
          <section>
            <div className="">
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}