"use client";
import styles from './page.module.css';

export default function Signup() {
    return (
      <div className={styles.container}>
        <div className={styles.textBackground}>
          <span className={styles.gradientText}>LearningMatch</span>
          <h1 className={styles.text}><strong>Create Account</strong></h1>
          
          <div className={styles.formContainer}>
            <form className={styles.form}>
              {/* First Name and Last Name inputs */}
              <div className={styles.nameContainer}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required />
                </div>
              </div>
  
              {/* Email input */}
              <div className={styles.inputWrapper}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
  
              {/* Password input */}
              <div className={styles.inputWrapper}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
  
              {/* Create Account button */}
              <button type="submit" className={styles.button}>Create Account</button>
  
              {/* Login hyperlink */}
              <p className={styles.loginText}>
                Already got an account? <a href="/login" className={styles.loginLink}>Login!</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
  