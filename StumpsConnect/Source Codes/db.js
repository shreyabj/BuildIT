const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',         
    user: 'root',        // Change if your username is different
    password: 'root',    // Change if you have set a different password
    database: 'buildit' // Must match the created database
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;

