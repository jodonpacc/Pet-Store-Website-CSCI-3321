const db = require("../db_connection.js").db_connection;
const authenticateUser = require('./accountModel.js').authenticateUser;
const getProductInfo = require('./productModel.js').getProductInfo;
const fs = require('fs');

/* Adds a new product listing to the database with provided info. 
If no image is supplied, it uses default_product_img.png.
Authenticates user and only executes successfully if authentication is successful and user is an admin.
takes in {
    username:
    formData: {
        title:
        description:
        price:
        quantity:
        rating:
        password:
    }
    file: {
        filename: (of uploaded image)
    } 
}
callback takes in an object parameter with the following fields {
    message: 
    success: true/false
    dbResult: (if exists)
}
*/
function addListing(username, formData, file, callback) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(username, formData.password, (err, succ, mess, adm) => {
        if(err) callback({ message: mess, success: false });

        if(succ && adm) {
            // Use default img unless image is supplied
            let fileName = 'default_product_img.png';
            if(file) {
                fileName = file.filename;
            }

            // Insert new product listing into database
            let sql = 'INSERT INTO Product (title, description, price, quantity, img_filename) VALUES ($1, $2, $3, $4, $5) RETURNING product_id';
            db.query(sql, [formData.title, formData.description, formData.price, formData.quantity, fileName])
                .then(result => {
                    // HERE, need to get product ID somehow
                    console.log(result.rows[0].product_id);
                    addAdminChange('ADD', username, result.rows[0].product_id);
                    callback({ message: "Product listing added successfully", success: true, dbResult: result });
                })
                .catch(err2 => {
                    callback({ message: "One or more of your entries is invalid.", success: false, dbResult: err2 });
                });
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            callback({ message: denyMessage, success: false });
        }
    });
}

/* Removes/reinstates an existing product listing to the database with provided info. 
Authenticates user and only executes successfully if authentication is successful and user is an admin.
takes in {
    username:
    password:
    prod_id: product id to be changed
    removing: true/false (sets the products removed attribute to this boolean)
}
callback takes in an object parameter with the following fields {
    message: 
    success: true/false
    dbResult: (if exists)
}
*/
function setRemovedListing(username, password, prod_id, removing, callback) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(username, password, (err, succ, mess, adm) => {
        if(err) callback({ message: mess, success: false });

        if(succ && adm) {
            // Remove product listing
            // let sql = 'DELETE FROM Product WHERE product_id = $1';
            let sql = 'UPDATE Product SET removed = $1 WHERE product_id = $2';
            db.query(sql, [removing, prod_id])
                .then(result => {
                    // Add change to the audit log
                    changeType = removing ? 'REMOVE' : 'READD';
                    addAdminChange(changeType, username, prod_id);
                    callback({ message: "Product listing changed successfully. (Action: " + changeType + ")", success: true, dbResult: result });
                })
                .catch(err3 => {
                    callback({ message: "There was an unexpected error.", success: false, dbResult: err3 });
                });
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            callback({ message: denyMessage, success: false });
        }
    });
}

/* Edits an existing product listing in the database with provided info. 
Some provided information is blank, only updates fields in database with the non-blank info provided.
Authenticates user and only executes successfully if authentication is successful and user is an admin.
takes in {
    username:
    formData: {
        id:
        title:
        description:
        price:
        quantity:
        rating:
        password:
    }
    file: {
        filename: (of uploaded image)
    } 
}
callback takes in an object parameter with the following fields {
    message: 
    success: true/false
    dbResult: (if exists)
}
*/
function editListing(username, formData, file, callback) {
    // Authenticate user as admin, sending req.session.username as username and req.body.password as password
    authenticateUser(username, formData.password, (err, succ, mess, adm) => {
        if(err) callback({ message: mess, success: false });

        if(succ && adm) {
            // Get original values of given product id
            getProductInfo(formData.id, (err2, productInfo) => {
                if(err2) callback({ message: err2, success: false });

                if(productInfo) {
                    // Edit with new values, unless they are empty, then use original value.
                    const setTitle = formData.title ? formData.title : productInfo.title;
                    const setDesc = formData.description ? formData.description : productInfo.description;
                    const setPrice = formData.price ? formData.price : productInfo.price;
                    const setQuantity = formData.quantity ? formData.quantity : productInfo.quantity;

                    // If file is submitted use new image and remove old one (if image has prefix 'prodimage' as generated by multer)
                    let setImgFilename = productInfo.img_filename;
                    if(file) {
                        setImgFilename = file.filename;
                        if(productInfo.img_filename.startsWith('prodimage')) {
                            removeFile(productInfo.img_filename);
                        }
                    }

                    let sql = 'UPDATE Product SET title = $1, description = $2, price = $3, quantity = $4, img_filename = $5 WHERE product_id = $6';
                    db.query(sql, [setTitle, setDesc, setPrice, setQuantity, setImgFilename, formData.id])
                        .then(result => {
                            // Add change to the audit log
                            addAdminChange('EDIT', username, formData.id);
                            callback({ message: "Product listing edited successfully", success: true, dbResult: result });
                        })
                        .catch(err3 => {
                            callback({ message: "There was an unexpected error.", success: false, dbResult: err3 });
                        });
                } else {
                    callback({ message: "There is no product with the given product ID.", success: false });
                }
            })
        } else {
            let denyMessage = "Access Denied: ";
            if(succ) {
                denyMessage += "You must be logged into an administrator account.";
            } else {
                denyMessage += mess;
            }
            callback({ message: denyMessage, success: false });
        }
    });
}

// Takes in a filename, deletes the image at client/public/assets/images/filename
// Image is automatically uploaded in admin.js when a request with an image is received,
// if the following function is unsuccessful, that image needs to be removed.
// This function is also used when a product is removed, or edited to have a new image
function removeFile(filename) {
    fs.unlink("../client/public/assets/images/" + filename, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed image.");
        }
    })
}

/* Returns a list of all admin changes made to a product
Takes in productID
returns a List of AdminChanges {
    change_id:
    type:
    change_time:
    user_name:
    product_id:
}
*/
function getAuditTrail(productID, callback) {
    let sql = 'SELECT * FROM AdminChange WHERE product_id = $1';
    db.query(sql, [productID])
        .then(result => {
            callback(null, result.rows);
        })
        .catch(err => {
            callback(err, null);
        });
}

/* Adds a new entry to the AdminChange table to indicate a new admin log
Takes in {
    type: 'ADD', 'REMOVE', 'READD', or 'EDIT'
    username: (of admin who made change)
    productID: (of product involved)
}
*/
function addAdminChange(type, username, productID) {
    let sql = 'INSERT INTO AdminChange (type, user_name, product_id) VALUES ($1, $2, $3)';
    db.query(sql, [type, username, productID])
        .then(result => console.log('Logged new admin ' + type + ' action by user ' + username))
        .catch(err => console.log('Error logging admin change: ' + err));
}

module.exports = {addListing, setRemovedListing, editListing, removeFile, getAuditTrail, addAdminChange};