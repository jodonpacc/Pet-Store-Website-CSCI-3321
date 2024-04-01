const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticateUser = require('./account.js').authUser;
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
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(req.session.username, req.body.password, (err, succ, mess, adm) => {
        if(err) {
            // If file was submitted, undo it
            if(req.file) {
                removeFile(req.file.filename);
            }

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
                    return res.json({ dbResult: err, message: "One or more of your entries is invalid.", success: false });
                } else {
                    return res.json({ dbResult: result, message: "Product listing added successfully", success: true });
                }
            });
        } else {
            // If file was submitted, undo it
            if(req.file) {
                removeFile(req.file.filename);
            }

            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            return res.json({ message: denyMessage, success: false });
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
            // Get product's current image so we can remove it from filesystem
            getProductInfo(req.body.prod_id, (err2, productInfo) => {
                if(err2) return res.json(err2);
                
                // Remove product listing
                let sql = 'DELETE FROM Product WHERE product_id = ?';
                db.query(sql, [req.body.prod_id], (err, result) => {
                    if (err) {
                        return res.json({ dbResult: err, message: "There was an unexpected error.", success: false });
                    } else {
                        if(productInfo.img_filename.startsWith('prodimage')) {
                            removeFile(productInfo.img_filename);
                        }
                        return res.json({ dbResult: result, message: "Product listing removed successfully", success: true });
                    }
                });
            });
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            return res.json({ message: denyMessage, success: false });
        }
    });
});

// Receives a product id and information to edit the attributes of the listing in the database
router.post('/edit', upload.single('image'), function(req, res) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(req.session.username, req.body.password, (err, succ, mess, adm) => {
        if(err) {
            // If file was submitted, undo it
            if(req.file) {
                removeFile(req.file.filename);
            }

            return res.json(err);
        }

        if(succ && adm) {
            // Get original values of given product id
            getProductInfo(req.body.id, (err2, productInfo) => {
                if(err2) return res.json(err2);
                if(productInfo) {
                    // Edit with new values, unless they are empty, then use original value.
                    const setTitle = req.body.title ? req.body.title : productInfo.title;
                    const setDesc = req.body.description ? req.body.description : productInfo.description;
                    const setPrice = req.body.price ? req.body.price : productInfo.price;
                    const setQuantity = req.body.quantity ? req.body.quantity : productInfo.quantity;

                    // If file is submitted use new image and remove old one (if image has prefix 'prodimage' as generated by multer)
                    let setImgFilename = productInfo.img_filename;
                    if(req.file) {
                        setImgFilename = req.file.filename;
                        if(productInfo.img_filename.startsWith('prodimage')) {
                            removeFile(productInfo.img_filename);
                        }
                    }

                    let sql = 'UPDATE Product SET title = ?, description = ?, price = ?, quantity = ?, img_filename = ? WHERE product_id = ?';
                    db.query(sql, [setTitle, setDesc, setPrice, setQuantity, setImgFilename, req.body.id], (err3, result) => {
                        if(err3) {
                            return res.json({ dbResult: err3, message: "There was an unexpected error.", success: false });
                        } else {
                            return res.json({ dbResult: result, message: "Product listing edited successfully", success: true });
                        }
                    });
                } else {
                    return res.json({ message: "There is no product with the given product ID.", success: false });
                }
            })
        } else {
            // If file was submitted, undo it
            if(req.file) {
                removeFile(req.file.filename);
            }

            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            return res.json({ message: denyMessage, success: false });
        }
    });
});

// Deletes uploeaded image in case authentication is unsuccessful (ASSUMES IMAGE IS IN client/public/assets/images)
// (If user submits an image and a wrong password, image will still be uploaded and needs to be removed)
function removeFile(filename) {
    fs.unlink("../client/public/assets/images/" + filename, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed image.");
        }
    })
}

module.exports = router;