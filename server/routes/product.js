const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;

router.use(express.json());

const product = (req, res) => {
    console.log(req.query);
    let sql = "SELECT title, description, price, img_filename, rating FROM Product WHERE product_id = ?";
    db.query(sql, [req.query.productID], (err, result) => {
        if (err) return res.json(err);
        return
    });
};

/* Returns a list of all products, each product has the following fields:
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

module.exports = router;