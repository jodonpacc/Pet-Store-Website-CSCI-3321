const db = require("../db_connection.js").db_connection;

const product = (req, res) => {
    console.log(req.query);
    let sql = "SELECT title, description, price, img_filename, rating FROM Product WHERE product_id = ?";
    db.query(sql, [req.query.productID], (err, result) => {
        if (err) return res.json(err);
        return
    });
};

module.exports = product;