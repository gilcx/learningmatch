"use client";
import styles from './page.module.css';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [userProvince, setUserProvince] = useState("");
  const [userPreferences, setUserPreferences] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userEmail = sessionStorage.getItem("userEmail");
        if (!userEmail) return;

        // Fetch user name from /users.json
        const usersResponse = await fetch('/users.json');
        if (!usersResponse.ok) throw new Error("Failed to fetch users data");

        const users = await usersResponse.json();
        const user = users.find(u => u.email === userEmail);
        if (user) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else {
          console.warn("User not found in /users.json");
        }

        // Fetch preferences and province from /samplepreferences.json
        const preferencesResponse = await fetch('/samplepreferences.json');
        if (!preferencesResponse.ok) throw new Error("Failed to fetch preferences data");

        const preferencesData = await preferencesResponse.json();
        const userPreferencesData = preferencesData.find(p => p.email === userEmail);
        if (userPreferencesData) {
          setUserProvince(userPreferencesData.province || "Unknown Province");
          setUserPreferences(userPreferencesData.preferences || []);
        } else {
          console.warn("User not found in /samplepreferences.json");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    async function fetchSchools() {
      try {
        const schoolsResponse = await fetch('/schools.json');
        if (!schoolsResponse.ok) throw new Error("Failed to fetch schools data");

        const schools = await schoolsResponse.json();
        setFilteredSchools(() => {
          // Filter schools by province
          const sameProvinceSchools = schools.filter(school => school.province === userProvince);

          // Prioritize schools based on user preferences within the same province
          const prioritizedSchools = sameProvinceSchools.map(school => {
            const matchingPrograms = school.programs.filter(program => 
              program.fields.some(field => userPreferences.includes(field))
            );
            return { school: school.school, programs: matchingPrograms };
          }).filter(school => school.programs.length > 0); // Only include schools with matching programs

          // Get the remaining schools from other provinces
          const otherProvinceSchools = schools.filter(school => school.province !== userProvince);
          
          // Combine both same-province and other-province schools
          return [...prioritizedSchools, ...otherProvinceSchools.map(school => {
            const matchingPrograms = school.programs.filter(program => 
              program.fields.some(field => userPreferences.includes(field))
            );
            return { school: school.school, programs: matchingPrograms };
          }).filter(school => school.programs.length > 0)];
        });
      } catch (error) {
        console.error("Error fetching schools data:", error);
      }
    }

    fetchUserData().then(fetchSchools); // Ensure user data is fetched first
  }, [userProvince, userPreferences]);

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
        <h1 className={styles.title}>School Suggestions</h1>
        <h2 className={styles.subtitle}>
          Hi {userName || "there"}, here are some schools we think would align well with your profile criteria!
        </h2>
        <div className={styles.additionalInfo}>
          <p><strong>Province:</strong> {userProvince}</p>
          <p><strong>Preferences:</strong> {userPreferences.length > 0 ? userPreferences.join(", ") : "None specified"}</p>
        </div>

        {/* Display Schools */}
        <div className={styles.schoolsContainer}>
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school, index) => (
              <div key={index} className={styles.schoolCard}>
                <h3 className={styles.schoolName}>{school.school}</h3>
                <div className={styles.programList}>
                  {school.programs.map((program, programIndex) => (
                    <div key={programIndex} className={styles.programCard}>
                      <p><strong>Program:</strong> {program.name}</p>
                      <p><strong>Fields:</strong> {program.fields.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No schools found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
