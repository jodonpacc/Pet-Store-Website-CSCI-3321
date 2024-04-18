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
router.post('/', function (req, res) {
    console.log("Getting product info for product_id: " + req.body.prod_id)
    productModel.getProductInfo(req.body.prod_id, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
})

// productModel.getAllProducts()
router.get('/allProducts', function (req, res) {
    console.log("getting all product info")
    productModel.getAllProducts((err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
});


// productModel.getAvailableProducts()
router.get('/availableProducts', function(req, res) {
    productModel.getAvailableProducts((err, result) => {
        if(err) return res.json(err)
        return res.json(result);
    })
})

// productModel.addToCart()
router.post('/addToCart', function (req, res) {
    res.send([]);

});

module.exports = router;