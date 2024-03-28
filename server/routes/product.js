
const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;

router.use(express.json());

/*
Returns the product information for a given product ID
takes in {
    productID:
}
returns {
    title:
    description:
    price:
    img_filename:
    rating:
}
*/
const product = (req, res) => {
    console.log(req.query);
    let sql = "SELECT title, description, price, img_filename, rating FROM Product WHERE product_id = ?";
    db.query(sql, [req.query.productID], (err, result) => {
        if (err) return res.json(err);
        return
    });
};

/*
Adds one of a product to the user's cart
takes in {
    productID:
}
returns true for success, false for not success
*/
router.get('/addToCart', (req, res) => {
    res.send([]);
});

module.exports = product;