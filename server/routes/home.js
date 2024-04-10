const express = require("express");
const router = express.Router();
const cors = require('cors');
const homeModel = require('../models/homeModel.js');

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

module.exports = router;