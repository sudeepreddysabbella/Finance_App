


const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Secret for JWT
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;


// Signup Endpoint
// Signup Route

app.post("/signup", async (req, res) => {
  console.log("Received signup request");
  console.log("Request body:", req.body);

  const { name, email, password } = req.body;

  // Log individual fields
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password length:", password ? password.length : "No password");

  // Validate Input
  if (!name || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into PostgreSQL
      const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
      await pool.query(query, [name, email, hashedPassword]);

      console.log("User inserted successfully");
      res.status(200).json({ message: "User signed up successfully!" });
  } catch (error) {
      console.error("Detailed error inserting user:", error);
      res.status(500).json({ error: "An error occurred during signup", details: error.message });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
