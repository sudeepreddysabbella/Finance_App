


const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


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


//adding new data 


app.post("/add-customer", async (req, res) => {
  try {
    const {
      serialnumber,
      name,
      date,
      phonenumber,
      principalnumber,
      totalamount,
      numberofinstallments,
      address,
    } = req.body;

    console.log("Received Data:", req.body); // Debugging log

    // Check if all fields are provided
    if (!serialnumber || !name || !date || !phonenumber || !principalnumber || !totalamount || !numberofinstallments || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate input formats
    if (!/^\d{4}$/.test(serialnumber)) {
      return res.status(400).json({ error: "Serial number must be a 4-digit number." });
    }
    if (!/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({ error: "Phone number must be a 10-digit number." });
    }
    if (principalnumber <= 0 || totalamount <= 0 || numberofinstallments <= 0) {
      return res.status(400).json({ error: "Principal, total amount, and installments must be positive numbers." });
    }

    // Insert into database
    const query = `
      INSERT INTO line1
      (serialnumber, name, date, phonenumber, principalnumber, totalamount, numberofinstallments, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    const values = [serialnumber, name, date, phonenumber, principalnumber, totalamount, numberofinstallments, address];

    await pool.query(query, values);

    res.status(200).json({ message: "Customer added successfully!" });
  } catch (error) {
    console.error("Database Error:", error); // This will log the exact error
    res.status(500).json({ error: "Failed to add customer. Check server logs for details." });
  }
});

// get the customer details

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ Fix: Ensure Route Works
// app.get("/customers", async (req, res) => {
//   try {
//     console.log("Fetching customers from database...");
//     const result = await pool.query("SELECT serialnumber,name,phonenumber,totalamount,address FROM line1 ORDER BY serialnumber ASC");
//     console.log("Fetched customers:", result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching customers:", error.message);
//     console.log(error);
//     res.status(500).json({ error: "Database Query Failed" });
//   }
// });

app.get("/customers", async (req, res) => {
  try {
    console.log("Fetching customers from database...");
    const result = await pool.query("SELECT * FROM line1 ORDER BY serialnumber ASC");
    console.log("Fetched customers:", result.rows);
    
    res.json(result.rows); // Send JSON response
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    res.status(500).json({ error: "Database Query Failed", details: error.message });
  }
});


app.get("/getData/:day", async (req, res) => {
  const { day } = req.params; // Extract day from request parameters

  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  if (!validDays.includes(day.toLowerCase())) {
    return res.status(400).json({ message: "Invalid day provided" });
  }

  try {
    const tableName = `"${day.toLowerCase()}"`; // Ensure proper table name format

    // Query data from the respective day's table using parameterized query
    const result = await pool.query(`SELECT serialnumber, name, amount_paid FROM ${tableName} ORDER BY serialnumber ASC`);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ success: false, message: "Error fetching data", error: error.message });
  }
});

// for posting the collection

app.post("/addData/:day", async (req, res) => {
  const { day } = req.params;
  const { serialnumber, name, amount_paid, installment } = req.body;

  // Validate input fields
  if (!serialnumber || !name || !amount_paid || installment === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate the provided day
  const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const lowerDay = day.toLowerCase();

  if (!validDays.includes(lowerDay)) {
    return res.status(400).json({ message: "Invalid day provided" });
  }

  try {
    const tableName = `"${lowerDay}"`; // Ensuring valid table naming convention

    // Check if the serialnumber exists
    const checkQuery = `SELECT * FROM line1 WHERE serialnumber = $1 LIMIT 1`;
    const checkResult = await pool.query(checkQuery, [serialnumber]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update totalamount and installment count
    const user = checkResult.rows[0];
    const newTotalAmount = user.totalamount - amount_paid;
    const newInstallment = user.numberofinstallments - 1;

    const updateQuery = `UPDATE line1 
                         SET totalamount = $1, numberofinstallments = $2 
                         WHERE serialnumber = $3 
                         RETURNING *`;

    const updateResult = await pool.query(updateQuery, [newTotalAmount, newInstallment, serialnumber]);

    res.status(200).json({
      success: true,
      message: "Customer record updated successfully",
      data: updateResult.rows[0],
    });

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});


// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
