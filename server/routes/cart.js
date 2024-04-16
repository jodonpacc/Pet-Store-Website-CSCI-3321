const express = require("express");
const router = express.Router();
const cors = require('cors');
const cartModel = require('../models/cartModel.js');

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

// cartModel.getCartItems()
router.get('/cartItems', (req, res) => {
    res.send([]);
});

// cartModel.adjustQuantity()
router.get('/adjustQuantity', (req, res) => {
    res.send([]);
});

// cartModel.checkout()
router.post('/checkout', (req, res) => {
    res.send([]);
});

// cartModel.addToCart()
router.get('/addToCart', (req, res) => {
    res.send([]);
});

module.exports = router;