"use client";
import styles from './page.module.css';
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textBackground}>
        <h1 className={styles.heading}>
          Welcome to <span className={styles.gradientText}>LearningMatch</span>
        </h1>
        <p className={styles.text}>Please Log In or Sign Up with your School Credentials</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => window.location.href = '/login'}>Log In</button>
        <button className={styles.button} onClick={() => window.location.href = '/signup'}>Sign Up</button>
      </div>
      </div>

    </div>
  );
}
