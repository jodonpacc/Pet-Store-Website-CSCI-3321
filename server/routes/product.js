const express = require("express");
const router = express.Router();
const cors = require('cors');
const productModel = require('../models/productModel.js');

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

router.use(express.json());

// productModel.getProductInfo()
router.post('/', function(req, res) {
    productModel.getProductInfo(req.body.prod_id, (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    });
})

// productModel.getAllProducts()
router.get('/allProducts', function(req, res) {
    productModel.getAllProducts((err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
});

// productModel.addToCart()
router.get('/addToCart', (req, res) => {
    res.send([]);
});

module.exports = router;