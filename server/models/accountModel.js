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
            console.log(err);
            callback(err, false, "The following error occurred while authenticating the user: " + err, false);
        });
}

/* Takes in the session object from a request:
If the user is logged in, this object will have the fields username and is_admin (as we have specified)
If the user is not logged in, this object will be undefined or have a blank username field
returns {
    valid: true/false
    username: (if exists)
    is_admin: (if exists)
}
*/
function getUserInfo(session) {
    if(session.username && session.username.length >= 5) {
        return { valid: true, username: session.username, is_admin: session.is_admin };
    } else {
        return { valid: false };
    }
}

/* Takes a username and password, authenticates the user and, if successful, modifies the session info to log the user in.
Takes in the session object from a request (described in comments for getUserInfo)
callback takes an object as a parameter with the following fields: {
    message: 
    success: true/false
}
*/
function login(username, password, session, callback) {
    authenticateUser(username, password, (err, succ, mess, adm) => {
        if(err) {
            console.log(err);
            callback({ message: mess, success: false });
        }

        if(succ) {
            session.username = username;
            session.is_admin = adm;
        }
        callback({ message: mess, success: succ });
    });
}

/* Takes in the session object from a request (described in the comments for getUserInfo)
Modifies the session object to have a blank username field to log out the user
returns a logout message */
function logout(session) {
    session.username = '';
    session.is_admin = false;
    return "Successfully logged out.";
}

// Takes in a username and password and attempts to create an account with these details, if possible.
// returns a status message/error
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
            console.log(err);
            callback(err);
        });
}

module.exports = {authenticateUser, getUserInfo, login, logout, createAccount};