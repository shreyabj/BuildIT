import express from 'express';
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "cricket",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          res.redirect("/dashboard");
        } else {
          res.send("Incorrect Email and/or Password!");
        }
        res.end();
      },
    );
  } else {
    res.send("Please enter Email and Password!");
    res.end();
  }
});


app.get("/dashboard", (req, res) => {
  if (req.session.loggedin) {
    res.send(`Welcome back, ${req.session.email}!`);
  } else {
    res.send("Please login to view this page!");
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
