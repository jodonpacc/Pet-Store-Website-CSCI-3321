const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;
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

const product = (req, res) => {
    console.log(req.query);
    let sql = "SELECT title, description, price, img_filename, rating FROM Product WHERE product_id = ?";
    db.query(sql, [req.query.productID], (err, result) => {
        if (err) return res.json(err);
        return
    });
};

// Given a product id, returns all the values of that product from database
// Seems like this function is in progress by someone else but to test
// admin edit page I have to have it so I wrote this one
const getProductInfo = (id, callback) => {
    let sql  = 'SELECT * FROM Product WHERE product_id = ?';
    db.query(sql, [id], (err, result) => {
        if(err) {
            callback(err, null);
        }
        callback(null, result[0]);
    });
}

// getProduct access for frontend, must pass a product_id, returns an object that may be empty!
router.post('/', function(req, res) {
    getProductInfo(req.body.prod_id, (err, result) => {
        if(err) {
            return res.json(err);
        }
        return res.json(result);
    });
})

/* Returns a list of all products, each product has the following fields:
{
    product_id:
    title:
    description:
    price:
    quantity:
    img_filename:
    rating:
}
*/
router.get('/allProducts', function(req, res) {
    const sql = 'SELECT * FROM Product';
    db.query(sql, (err, result) => {
        if(err) return res.json(err);

        if(result.length > 0) {
            return res.json(result);
        }
    })
})

module.exports = {
    productRouter: router,
    getProduct: getProductInfo
}