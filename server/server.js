const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ngkast',
  password: 'adm1n',
  port: 5432, // Change to your PostgreSQL port if different
});

app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, username, password, retypePassword, email } = req.body;
  console.log('Received registration data:', { name, username, password, retypePassword, email });

  try {
    // Check if the username already exists in the database
    const userExistsQuery = 'SELECT * FROM users WHERE user_name = $1';
    const userExistsResult = await pool.query(userExistsQuery, [username]);

    if (userExistsResult.rows.length > 0) {
      // Username already exists, send an error response
      return res.status(400).json({ error: 'Username already exists' });
    }

    // If the username is unique, insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (user_name, login_id, password, email_id) VALUES ($1, $2, $3, $4)';
    await pool.query(insertUserQuery, [name, username, password, email]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
