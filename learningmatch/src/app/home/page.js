"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button className={styles.menuButton} onClick={() => window.location.href = '/profile'}>User Profile
        <img
            src="/user.png"
            alt="User Icon"
            className={styles.icon}
          />
          
        </button>

        <div>
          <button className={styles.menuButton}>Student
          <img
            src="/chart.png"
            alt="Chart Icon"
            className={styles.icon}
          />
          </button>
          <div className={styles.subMenu}>
            <button className={styles.subMenuButton}>
              University Suggestions
            </button>
          </div>
        </div>

        <button className={styles.menuButton}>
          <img
            src="/sign-out-alt.png"
            alt="Logout Icon"
            className={styles.icon}
          />
          Logout
        </button>
      </aside>

      <main className={styles.content}></main>
    </div>
  );
}
