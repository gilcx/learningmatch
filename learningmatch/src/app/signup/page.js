"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    // If the user is already signed in, redirect to the home page
    if (sessionStorage.getItem("userEmail")) {
      window.location.href = '/home'; // Redirect using window.location.href
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setSuccess('Account created successfully!');

        // Store the user's email in sessionStorage
        sessionStorage.setItem('userEmail', formData.email);

        // Redirect to /home after a short delay
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Display the error from the backend

        // Clear error message after 7 seconds
        setTimeout(() => setError(''), 7000);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');

      // Clear error message after 7 seconds
      setTimeout(() => setError(''), 7000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textBackground}>
        <span className={styles.gradientText}>LearningMatch</span>
        <h1 className={styles.text}><strong>Create Account</strong></h1>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && <p className={styles.error}>{error}</p>}
            {/* Success Message */}
            {success && <p className={styles.success}>{success}</p>}

            {/* First Name and Last Name inputs */}
            <div className={styles.nameContainer}>
              <div className={styles.inputWrapper}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div className={styles.inputWrapper}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
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
