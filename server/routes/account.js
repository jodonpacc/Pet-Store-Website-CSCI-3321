const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());

// Requested from frontend and returns username and is_admin from session
router.get("/", function (req, res) {
    if(req.session.username && req.session.username.length >= 5) {
        return res.json({ valid: true, username: req.session.username, is_admin: req.session.is_admin });
    } else {
        return res.json({ valid: false });
    }
});

// Receiving a username and password for logging in
router.post("/login", function (req, res) {
    authenticateUser(req.body.username, req.body.password, (err, succ, mess, adm) => {
        if(err) {
            return res.json(err);
        }

        if(succ) {
            req.session.username = req.body.username;
            req.session.is_admin = adm;
        }
        return res.json({ message: mess, success: succ });
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
                if (err2) {
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

// Receiving request to log out the user
router.post("/logout", function(req, res) {
    req.session.username = '';
    req.session.is_admin = false;
    return res.json("Successfully logged out.");
});

// Created this as frontend access but we shouldn't actually need it
// Returns: message: status of authentication and status: (was user successfully authenticated)
// router.post("/authenticate", function(req, res) {
//     authenticateUser(req.body.username, req.body.password, (err, succ, mess, adm) => {
//         if(err) {
//             return res.json(err);
//         }
//         return res.json({ message: mess, success: succ, is_admin: adm });
//     });
// });

// Takes a username and password and confirms they match/exist
// callback(error, bool success, string statusMessage, bool isAdmin)
const authenticateUser = (error, username, password, callback) => {
    let sql = "SELECT password, is_admin FROM User WHERE user_name = ?";
    db.query(sql, [username], (err, result) => {
        if (err) {
            callback(err, false, "Error encountered.", false);
        }

        if (result.length > 0) {
            // check pass
            if (password === result[0].password) {
                // username and password are correct
                callback(null, true, "Successfully authenticated.", result[0].is_admin);
            } else {
                // user entered the wrong password
                callback(null, false, "The given password is incorrect.", false);
            }
        } else {
            // there is no account with the given username
            callback(null, false, "There is no account with the given username.", false);
        }
    });
}

module.exports = router;