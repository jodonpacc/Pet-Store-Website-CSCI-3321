const db = require("../db_connection.js").db_connection;

// Takes a username and password and confirms they match/exist
// callback takes parameters: (error, bool success, string statusMessage, bool isAdmin)
function authenticateUser(username, password, callback) {
    let sql = "SELECT password, is_admin FROM Customer WHERE user_name = $1";
    db.query(sql, [username])
        .then(result => {
            if (result.rows.length > 0) {
                // check pass
                if (password === result.rows[0].password) {
                    // username and password are correct
                    callback(null, true, "Successfully authenticated as " + username + ".", result.rows[0].is_admin);
                } else {
                    // user entered the wrong password
                    callback(null, false, "The given password is incorrect.", false);
                }
            } else {
                // there is no account with the given username
                callback(null, false, "There is no account with the given username.", false);
            }
        })
        .catch(err => {
            callback(err, false, "The following error occurred while authenticating the user: " + err, false);
        });
}

function getUserInfo(session) {
    if(session.username && session.username.length >= 5) {
        return { valid: true, username: session.username, is_admin: session.is_admin };
    } else {
        return { valid: false };
    }
}

function login(username, password, session, callback) {
    authenticateUser(username, password, (err, succ, mess, adm) => {
        if(err) callback({ message: mess, success: false });

        if(succ) {
            session.username = username;
            session.is_admin = adm;
        }
        callback({ message: mess, success: succ });
    });
}

function logout(req) {
    req.session.username = '';
    req.session.is_admin = false;
    return "Successfully logged out.";
}

function createAccount(username, password, callback) {
    // First check if an account is aleady created with given username
    let sql = "SELECT user_name FROM Customer WHERE user_name = $1";
    db.query(sql, [username])
        .then(result => {
            if (result.rows.length <= 0) {
                // create account
                let sql2 = "INSERT INTO Customer (user_name, password, is_admin) VALUES ($1, $2, false)";
                db.query(sql2, [username, password])
                    .then(result2 => {
                        callback("Account " + username + " successfully created. You may now log in.");
                    });
            } else {
                // Account already exists
                callback("There is already an account associated with this username.");
            }
        })
        .catch(err => {
            callback(err);
        });
}

module.exports = {authenticateUser, getUserInfo, login, logout, createAccount};