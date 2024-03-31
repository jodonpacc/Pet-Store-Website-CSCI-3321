const session = require('express-session');

// Set up express-session for saving information to user session
const sess = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24 // Equal to 1 day
    }
});

exports.sessionSetup = sess;