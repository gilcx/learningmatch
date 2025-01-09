import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // Parse incoming JSON request body
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // File path for users.json
    const filePath = path.join(process.cwd(), 'public', 'users.json');

    // Read the existing users file (or create an empty array if file doesn't exist)
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
    const users = JSON.parse(fileData);

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      return new Response(
        JSON.stringify({ error: 'Account email already exists. Maybe try login?' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add the new user to the list
    const newUser = { firstname: firstName, lastname: lastName, email, password };
    users.push(newUser);

    // Write the updated users array back to the file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    // Return success response
    return new Response(
      JSON.stringify({ message: 'User added successfully.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving user data:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

