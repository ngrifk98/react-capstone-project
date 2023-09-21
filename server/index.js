const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001; // Set the desired port number

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost", // Change this to your database host if needed
  database: "ngkast",
  password: "adm1n",
  port: 5432, // Change to your PostgreSQL port if different
});

app.use(bodyParser.json());
app.use(cors());

// Start your Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
