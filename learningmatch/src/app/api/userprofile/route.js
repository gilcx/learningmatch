import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // Parse incoming JSON request body
    const body = await req.json();
    const { email, grade, province, highschool, preferences, currentcourses } = body;
    console.log(body);
    // Validate required fields
    if (!email || !province || !highschool || !preferences || !currentcourses) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // File path for samplepreferences.json
    const filePath = path.join(process.cwd(), 'public', 'samplepreferences.json');

    // Read the existing students file (or create an empty array if file doesn't exist)
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
    const students = JSON.parse(fileData);

    // Check if the student with the given email already exists
    const studentIndex = students.findIndex(student => student.email === email);

    if (studentIndex !== -1) {
      // Update the existing student
      students[studentIndex] = {
        email,
        grade,
        province,
        highschool,
        preferences,
        currentcourses
      };
    } else {
      // Add a new student
      const newStudent = {
        email,
        grade,
        province,
        highschool,
        preferences,
        currentcourses
      };
      students.push(newStudent);
    }

    // Write the updated students array back to the file
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf-8');

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Student data saved successfully.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving student data:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
