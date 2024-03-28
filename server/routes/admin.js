const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const authenticateUser = require('./account.js').authUser;

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
        cb(null, '../client/src/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

// Receives information to create a new product listing, potentially including an image file
router.post('/add', upload.single('image'), function(req, res) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(req.session.username, req.body.password, (err, succ, mess, adm) => {
        if(err) {
            return res.json(err);
        }

        if(succ && adm) {
            // Use default img unless image is supplied
            let fileName = 'default_product_img.png';
            if(req.file) {
                fileName = req.file.filename;
            }

            // Insert new product listing into database
            let sql = 'INSERT INTO Product (title, description, price, quantity, img_filename) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [req.body.title, req.body.description, req.body.price, req.body.quantity, fileName], (err, result) => {
                if (err) {
                    return res.json({ dbResult: err, message: "One or more of your entries is invalid."});
                } else {
                    return res.json({ dbResult: result, message: "Product listing added successfully" });
                }
            });
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            return res.json({ message: denyMessage });
        }
    });
});

// Receives a product id to remove from the database
router.post('/remove', function(req, res) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(req.session.username, req.body.password, (err, succ, mess, adm) => {
        if(err) {
            return res.json(err);
        }

        if(succ && adm) {
            // Edit produt listing
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            return res.json({ message: denyMessage });
        }
    });
});

// Receives a product id and information to edit the attributes of the listing in the database
router.post('/edit', function(req, res) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(req.session.username, req.body.password, (err, succ, mess, adm) => {
        if(err) {
            return res.json(err);
        }

        if(succ && adm) {
            // Remove product listing
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            return res.json({ message: denyMessage });
        }
    });
});

module.exports = router;