"use client";
import styles from './page.module.css';
import { useState, useEffect } from 'react';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
      // If the user is already signed in, redirect to the home page
      if (sessionStorage.getItem("userEmail")) {
        window.location.href = '/home'; // Redirect using window.location.href
      }
    }, []);
    const handleLogin = async (e) => {
        e.preventDefault();

        // Fetch users from the public directory (assuming the file is placed in public/users.json)
        const response = await fetch('/users.json');
        const users = await response.json();

        // Find user with the provided email
        const user = users.find((user) => user.email === email);

        if (!user) {
        setError('Email does not exist');
        return;
        }

        if (user.password !== password) {
        setError('Incorrect password');
        return;
        }

        // If both match, log the user in
        sessionStorage.setItem('userEmail', email); // Store email in sessionStorage
        window.location.href = '/home'; // Redirect to /home
  };
  return (
    <div className={styles.container}>
      <div className={styles.textBackground}>
        <span className={styles.gradientText}>LearningMatch</span>
        <h1 className={styles.text}><strong>Access your Account</strong></h1>
        
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleLogin}>
            
            {/* Email input */}
            <div className={styles.inputWrapper}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login button */}
            <button type="submit" className={styles.button}>Login</button>
            {error && <p className={styles.error}>{error}</p>}
            {/* Signup hyperlink */}
            <p className={styles.signupText}>
              Don't have an account? <a href="/signup" className={styles.signupLink}>Sign Up!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
