const express = require('express');
// const { createProxyMiddleware} = require('http-proxy-middleware');
const { Pool } = require('pg');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000; 
// const apiProxy = createProxyMiddleware({
//   target: 'https://localhost:4000',
//   changeOrigin: true,
//   secure: false, // You may want to set this to false if you are targeting localhost with HTTPS
// });

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ngkast',
  password: 'adm1n',
  port: 5432, // PostgreSQL default port
});

// Configure session and cookie middleware
app.use(cookieParser());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in production with HTTPS
  })
);

// Middleware to parse JSON requests
app.use(express.json());
// app.use('/', apiProxy);

// Serve static files from the 'public' directory (where your React build files are)
// app.use(express.static(path.join(__dirname, '../public')));

// Define a wildcard route (*) to serve your React app's HTML file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// API REGISTRATION
app.post('/api/registerApi', async (req, res) => {
  const { login_id, user_name, password, email_id } = req.body; // Assuming you send the insert values as JSON in the request body

  try {
    const client = await pool.connect();

    // Define the insert query
    const query = `
      INSERT INTO users (login_id, user_name, password, email_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    // Values to insert
    const values = [login_id, user_name, password, email_id]; // Use the values from the request

    // Execute the insert query
    const result = await client.query(query, values);

    console.log(`Inserted ${result.rowCount} rows`); // Corrected log statement

    // Release the client back to the pool
    client.release();

    res.status(201).json(result.rows[0]); // Respond with the inserted record
  } catch (error) {
    console.error('Error inserting record', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API LOGIN
app.post('/api/loginApi', async (req, res) => {
  const { login_id, password } = req.body;

  try {
    const client = await pool.connect();

    // Define the select query to check if the user exists
    const query = `
      SELECT * FROM users WHERE login_id = $1 AND password = $2
    `;

    // Values to insert
    const values = [login_id, password];

    // Execute the select query
    const result = await client.query(query, values);

    // Check if a user with the provided login_id and password exists
    if (result.rowCount === 1) {
      // User exists and the credentials are correct
      req.session.user_name = result.rows[0].user_name; // Store user_name in the session
      res.cookie('user_name', result.rows[0].user_name); // Set user_name in the cookie
      res.status(200).json({ message: 'Login successful' });
    } else {
      // User doesn't exist or the credentials are incorrect
      res.status(401).json({ error: 'Authentication failed' });
    }

    // Release the client back to the pool
    client.release();
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Corrected log statement
});
