const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serves index.html

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "cricket_registration"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

app.post("/register", (req, res) => {
    console.log("Incoming request to /register");
    console.log("Form Data Received:", req.body);

    const {
        teamName,
        teamCaptain,
        ageCategory,
        country,
        email,
        countryCode,
        phoneNumber
    } = req.body;

    if (!teamName || !email || !phoneNumber) {
        return res.status(400).send("Missing required fields");
    }

    const sql = `
        INSERT INTO teams (team_name, team_captain, age_category, country, email, country_code, phone_number)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [teamName, teamCaptain, ageCategory, country, email, countryCode, phoneNumber], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database Error");
        }

        console.log("Data Inserted:", result.insertId);
        res.status(200).send("Team Registered Successfully!");
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
