const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;

router.use(express.json());

// Home page route
router.get("/", function (req, res) {
    res.send("API home page");
});

// Receiving a username and password for logging in
router.post("/login", function (req, res) {
    let sql = "SELECT password FROM User WHERE user_name = ?";
    db.query(sql, [req.body.username], (err, result) => {
        if (err) return res.json(err);

        if (result.length > 0) {
            // check pass
            if (req.body.password === result[0].password) {
                // login
                return res.json({ message: "Successfully logged in as " + req.body.username + ".", success: true });
            } else {
                // user entered the wrong password
                return res.json({ message: "The given password is incorrect.", success: false });
            }
        } else {
            // there is no account with the given username
            return res.json({ message: "There is no account with the given username.", success: false });
        }
    });
});

// Receiving a username and password for creating an account
router.post("/create_account", function (req, res) {
    // First check if an account is aleady created with given username
    let sql = "SELECT user_name FROM User WHERE user_name = ?";
    db.query(sql, [req.body.username], (err, result) => {
        if (err) return res.json(err);

        if (result.length <= 0) {
            // create account
            let sql2 = "INSERT INTO User (user_name, password, is_admin) VALUES (?, ?, false)";
            db.query(sql2, [req.body.username, req.body.password], (err2, result2) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json("Account " + req.body.username + " successfully created. You may now log in.");
                }
            });
        } else {
            // Account already exists
            return res.json("There is already an account associated with this username.");
        }
    });
});

module.exports = router;