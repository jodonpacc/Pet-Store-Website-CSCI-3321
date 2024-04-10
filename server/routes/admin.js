const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {authenticateUser} = require('../models/accountModel.js').authenticateUser;
const getProductInfo = require('./product.js').getProduct;

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, "prodimage_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

// Receives information to create a new product listing, potentially including an image file
router.post('/add', upload.single('image'), function(req, res) {
    return res.json(addListing(req.session.username, req.body, req.file));
});

// Receives a product id to remove from the database
router.post('/remove', function(req, res) {
    return res.json(removeListing(req.session.username, req.body.password, req.body.prod_id));
});

// Receives a product id and information to edit the attributes of the listing in the database
router.post('/edit', upload.single('image'), function(req, res) {
    return res.json(editListing(req.session.username, req.body, req.file));
});

module.exports = router;