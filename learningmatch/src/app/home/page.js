"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [userName, setUserName] = useState("NAME");

  useEffect(() => {
    // Fetch the user's email from sessionStorage
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
      // Fetch users.json to find the user's firstName
      fetch("/users.json")
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch user data.");
          return response.json();
        })
        .then((users) => {
          // Find the user with the matching email
          const user = users.find((u) => u.email === userEmail);
          if (user && user.firstName) {
            setUserName(user.firstName); // Update the welcome message with their first name
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all sessionStorage data
    window.location.href = "/"; // Redirect to the login page or homepage
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button
          className={styles.menuButton}
          onClick={() => (window.location.href = "/profile")}
        >
          User Profile
          <img src="/user.png" alt="User Icon" className={styles.icon} />
        </button>

        <div>
          <button className={styles.menuButton}>
            Student Tools
            <img src="/chart.png" alt="Chart Icon" className={styles.icon} />
          </button>
          <div className={styles.subMenu}>
            <button className={styles.subMenuButton} onClick={() => (window.location.href = "/schoolsuggestions")}>University Suggestions</button>
            <button className={styles.subMenuButton}>GPA Calculator</button>
            <button className={styles.subMenuButton}>Course Planner</button>
          </div>
        </div>
        <button className={styles.menuButton}>
          <img src="/graduation-cap.png" alt="Schools Icon" className={styles.icon} />
          Schools
        </button>
        <button className={styles.menuButton}>
          <img src="/book-alt.png" alt="Educators Icon" className={styles.icon} />
          Educators
        </button>
        <button className={styles.menuButton}>
          <img src="/interrogation.png" alt="Help Icon" className={styles.icon} />
          Help
        </button>
        <button className={styles.menuButton} onClick={handleLogout}>
          <img src="/sign-out-alt.png" alt="Logout Icon" className={styles.icon} />
          Logout
        </button>
      </aside>

      <main className={styles.content}>
        {/* LearningMatch gradient text */}
        <div className={styles.gradientTextContainer}>
          <span className={styles.gradientText}>LearningMatch</span>
          <span className={styles.welcomeText}>Welcome, {userName}</span>
        </div>
        {/* Divided sections */}
        <div className={styles.topSection}>
          <div className={styles.topRectangleLeft}>
            <h2 className={styles.sectionTitle}>Learn More About Queen's University</h2>
            <div className={styles.linksContainer}>
              <div className={styles.linkItem}>
                <img src="/queensulogo.png" alt="Official Website" className={styles.icon} />
                <a href="https://www.queensu.ca" target="_blank" rel="noopener noreferrer" className={styles.linkText}>Official Website</a>
              </div>
              <div className={styles.linkItem}>
                <img src="instagramicon.png" alt="Instagram" className={styles.icon} />
                <a href="https://www.instagram.com/queensuniversity/" target="_blank" rel="noopener noreferrer" className={styles.linkText}>Instagram</a>
              </div>
              <div className={styles.linkItem}>
                <img src="facebookicon.png" alt="Facebook" className={styles.icon} />
                <a href="https://www.facebook.com/queensuniversity" target="_blank" rel="noopener noreferrer" className={styles.linkText}>Facebook</a>
              </div>
              <div className={styles.linkItem}>
                <img src="/AMSlogo.webp" alt="Clubs" className={styles.icon} />
                <a href="https://www.myams.org/clubs/club-directory/" target="_blank" rel="noopener noreferrer" className={styles.linkText}>Clubs</a>
              </div>
            </div>
          </div>
          <div className={styles.topRectangleMiddle}>
            <h2>Today's Featured School: Queen's University</h2>
            <div className={styles.slideshow}>
              <img src="/Queens1.png" alt="Queen's University Campus" className={styles.slideshowImage} />
              <img src="/Queens2.jpg" alt="Queen's University Students" className={styles.slideshowImage} />
              <img src="/Queens3.png" alt="Queen's University Library" className={styles.slideshowImage} />
            </div>
            <span> A leading, research-intense university in Canada offering an inclusive, transformative education that will prepare you to make a global impact.</span>
          </div>          
          <div className={styles.topRectangleRight}>
          <h2>Popular post-secondary programs in Canada</h2>
            <div className={styles.programList}>
              <div className={styles.programItem}>Psychology (3.1)</div>
              <div className={styles.programItem}>Computer Science (3.7)</div>
              <div className={styles.programItem}>Nursing (3.96)</div>
              <div className={styles.programItem}>Business (3.2)</div>
              <div className={styles.programItem}>Dentistry (4.0)</div>
            </div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p className={styles.bottomTitle}>To Do List</p>
          <div className={styles.todoItems}>
            <span>Get school transcript</span>
            <span>Find a post-secondary program</span>
            <span>Fill out OUAC profile</span>
            <span>Apply to Universities</span>
          </div>
        </div>
      </main>
    </div>
  );
}
