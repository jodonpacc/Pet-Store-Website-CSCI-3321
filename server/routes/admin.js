const express = require("express");
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const adminModel = require('../models/adminModel.js');

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
// If addListing fails, the given image (if it exists) must be removed
router.post('/add', upload.single('image'), function(req, res) {
    adminModel.addListing(req.session.username, req.body, req.file, (result) => {
        if(!result.success && req.file) {
            adminModel.removeFile(req.file.filename);
        }
        return res.json(result);
    });
});

// Receives a product id to remove from the database
router.post('/remove', function(req, res) {
    adminModel.removeListing(req.session.username, req.body.password, req.body.prod_id, (result) => {
        return res.json(result);
    });
});

// Receives a product id and information to edit the attributes of the listing in the database
router.post('/edit', upload.single('image'), function(req, res) {
    adminModel.editListing(req.session.username, req.body, req.file, (result) => {
        if(!result.success && req.file) {
            adminModel.removeFile(req.file.filename);
        }
        return res.json(result);
    });
});

module.exports = router;