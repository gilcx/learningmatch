"use client";
import styles from './page.module.css';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [courses, setCourses] = useState([{ courseCode: '', grade: '' }]);
  const [province, setProvince] = useState('');
  const [preferences, setPreferences] = useState(['', '', '', '']);
  const [highSchool, setHighSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [userEmail, setUserEmail] = useState(null); // Store userEmail here

  // UseEffect to safely access sessionStorage in the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem("userEmail");
      setUserEmail(email); // Set the email only on the client-side

      // Fetch student data if userEmail is available
      if (email) {
        const fetchData = async () => {
          try {
            const response = await fetch('/samplepreferences.json');
            const data = await response.json();

            // Find the student data with matching email
            const studentData = data.find((student) => student.email === email);

            if (studentData) {
              // Populate form fields with student data
              setGrade(studentData.grade);
              setProvince(studentData.province);
              setPreferences(studentData.preferences || ['', '', '', '']);
              setHighSchool(studentData.highschool || '');
              setCourses(
                Object.entries(studentData.currentcourses || {}).map(([courseCode, grade]) => ({
                  courseCode,
                  grade
                }))
              );
            }
          } catch (error) {
            console.error('Error fetching student data:', error);
          }
        };

        fetchData();
      }
    }
  }, []); // Empty dependency array to run once on component mount

  const addCourse = () => {
    setCourses([...courses, { courseCode: '', grade: '' }]);
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const handlePreferenceChange = (index, value) => {
    const updatedPreferences = [...preferences];
    updatedPreferences[index] = value;
    setPreferences(updatedPreferences);
  };

  const handleSave = async () => {
    if (!userEmail) {
      alert("No user email found in session.");
      return;
    }

    const updatedStudent = {
      email: userEmail,
      grade, // Use the grade from state
      province,
      highschool: highSchool,
      preferences,
      currentcourses: courses.reduce((acc, course) => {
        acc[course.courseCode] = course.grade;
        return acc;
      }, {})
    };

    try {
      const response = await fetch('/api/userprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error saving student data:', error);
      alert('Error saving student data.');
    }
  };

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories',
    'Nunavut', 'Yukon'
  ];

  const preferenceOptions = [
    'Health', 'Technology', 'Engineering', 'Arts & Design', 
    'Business & Finance', 'Education', 'Environmental Science', 'Social Sciences'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.homeButtonContainer}>
        <button
          className={styles.homeButton}
          onClick={() => window.location.href = '/home'}
        >
          <img src="/home2.png" alt="Home" className={styles.homeIcon} />
        </button>
        </div>
      <div className={styles.textBackground}>
        <button className={styles.learningMatchButton} onClick={() => window.location.href = '/home'}>
          <img src="/home.png" alt="Home Icon" className={styles.icon} />
          <span className={styles.gradientText}>LearningMatch</span>
        </button>
        <h1 className={styles.text}><strong>Your Profile</strong></h1>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            {/* Grade and Province inputs side by side */}
            <div className={styles.nameContainer}>
              <div className={styles.inputWrapper}>
                <label htmlFor="grade">Grade</label>
                <input type="text" id="grade" name="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="province">Province</label>
                <select 
                    id="province" 
                    name="province" 
                    value={province} 
                    onChange={(e) => setProvince(e.target.value)} 
                    required
                >
                    <option value="" disabled>Select a Province</option>
                    {provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* High School input */}
            <div className={styles.inputWrapper}>
              <label htmlFor="highSchool">High School</label>
              <input type="text" id="highSchool" name="highSchool" value={highSchool} onChange={(e) => setHighSchool(e.target.value)} required />
            </div>

            {/* Horizontal Line with Text */}
            <div className={styles.horizontalLineWrapper}>
              <hr />
              <span>Preferences</span>
              <hr />
            </div>

            {/* Preferences select fields side by side */}
            <div className={styles.preferencesContainer}>
              {preferences.map((preference, index) => (
                <div className={styles.inputWrapper} key={index}>
                  <select
                    value={preference}
                    onChange={(e) => handlePreferenceChange(index, e.target.value)}
                    required
                  >
                    <option value="" disabled>Field {index + 1}</option>
                    {preferenceOptions.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Horizontal Line with Text */}
            <div className={styles.horizontalLineWrapper}>
              <hr />
              <span>Current Courses</span>
              <hr />
            </div>

            {/* Course Code and Grade side by side */}
            {courses.map((course, index) => (
              <div className={styles.nameContainer} key={index}>
                <input
                  type="text"
                  placeholder="Course Code"
                  value={course.courseCode}
                  onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={course.grade}
                  onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                  required
                />
              </div>
            ))}
            
            {/* Add More Rows Button */}
            <button type="button" className={styles.button} onClick={addCourse}>+</button>
          </form>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
