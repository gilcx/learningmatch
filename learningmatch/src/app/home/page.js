"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button className={styles.menuButton} onClick={() => window.location.href = '/profile'}>
          User Profile
          <img src="/user.png" alt="User Icon" className={styles.icon} />
        </button>

        <div>
          <button className={styles.menuButton}>
            Student Tools
            <img src="/chart.png" alt="Chart Icon" className={styles.icon} />
          </button>
          <div className={styles.subMenu}>
            <button className={styles.subMenuButton}>University Suggestions</button>
            <button className={styles.subMenuButton}>GPA Calculator</button>
            <button className={styles.subMenuButton}>Course Planner</button>
          </div>
        </div>
        <button className={styles.menuButton}>
          <img src="/graduation-cap.png" alt="Logout Icon" className={styles.icon} />
          Schools
        </button>
        <button className={styles.menuButton}>
          <img src="/book-alt.png" alt="Logout Icon" className={styles.icon} />
          Educators
        </button>
        <button className={styles.menuButton}>
          <img src="/interrogation.png" alt="Logout Icon" className={styles.icon} />
          Help
        </button>
        <button className={styles.menuButton}>
          <img src="/sign-out-alt.png" alt="Logout Icon" className={styles.icon} />
          Logout
        </button>
      </aside>

      <main className={styles.content}>
        {/* LearningMatch gradient text */}
        <div className={styles.gradientTextContainer}>
          <span className={styles.gradientText}>LearningMatch</span>
        </div>

        {/* Divided sections */}
        <div className={styles.topSection}>
          <p>Block 1</p>
        </div>
        <div className={styles.bottomSection}>
          <p>Block 2</p>
        </div>
      </main>
    </div>
  );
}
