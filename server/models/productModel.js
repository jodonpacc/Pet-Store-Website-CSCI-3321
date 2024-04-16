const db = require("../db_connection.js").db_connection;

/* Given a product id, returns all the values of that product from database
   Seems like this function is in progress by someone else but to test
   admin edit page I have to have it so I wrote this one
takes in {
    productID:
}
callback takes parameters (err, result)
result contains these fields (unless there is an error) {
    title:
    description:
    price:
    quantity:
    img_filename:
    rating:
}
May return an object that is empty
*/
function getProductInfo (id, callback) {
    let sql  = 'SELECT * FROM Product WHERE product_id = $1';
    db.query(sql, [id])
        .then(res => {
            callback(null, res.rows[0]);
        })
        .catch(err => {
            callback(err, null);
        })
}

/* Returns a list of all products, each product has the following fields:
{
    product_id:
    title:
    description:
    price:
    quantity:
    img_filename:
    rating:
    removed:
}
*/
function getAllProducts(callback) {
    const sql = 'SELECT * FROM Product';
    db.query(sql)
        .then(result => {
            callback(null, result.rows);
        })
        .catch(err => {
            callback(err, null);
        });
}

/* Returns a list of products that have not been removed, each product has the following fields:
These are the products that will be displayed to users
{
    product_id:
    title:
    description:
    price:
    quantity:
    img_filename:
    rating:
    removed: false
}
*/
function getAvailableProducts(callback) {
    const sql = 'SELECT * FROM Product WHERE removed = false';
    db.query(sql)
        .then(result => {
            callback(null, result.rows);
        })
        .catch(err => {
            callback(err, null);
        });
}

module.exports = {getProductInfo, getAllProducts, getAvailableProducts, addToCart};