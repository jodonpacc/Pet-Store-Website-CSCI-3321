const express = require("express");
const router = express.Router();
const accountModel = require('../models/accountModel.js');
const cors = require('cors');

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

// Requested from frontend and returns username and is_admin from session
router.get("/", function (req, res) {
    return res.json(accountModel.getUserInfo(req.session));
});

// Receiving a username and password for logging in
router.post("/login", function (req, res) {
    accountModel.login(req.body.username, req.body.password, req.session, (result) => {
        return res.json(result);
    });
});

// Receiving a username and password for creating an account
router.post("/create_account", function (req, res) {
    accountModel.createAccount(req.body.username, req.body.password, (result) => {
        return res.json(result);
    });
});

// Receiving request to log out the user
router.post("/logout", function(req, res) {
    return res.json(accountModel.logout(req));
});

module.exports = router;