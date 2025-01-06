"use client";
import styles from './page.module.css';
import { useState } from 'react';

export default function Profile() {
  const [courses, setCourses] = useState([{ courseCode: '', grade: '' }]);
  const [province, setProvince] = useState('');
  const [preferences, setPreferences] = useState(['', '', '', '']);
  
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
      <div className={styles.textBackground}>
        <span className={styles.gradientText}>LearningMatch</span>
        <h1 className={styles.text}><strong>Your Profile</strong></h1>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            {/* Grade and Province inputs side by side */}
            <div className={styles.nameContainer}>
              <div className={styles.inputWrapper}>
                <label htmlFor="grade">Grade</label>
                <input type="text" id="grade" name="grade" required />
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
              <input type="text" id="highSchool" name="highSchool" required />
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
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
}
