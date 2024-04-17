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
router.get('/cartInfo', (req, res) => {
    return res.json(cartModel.getCartInfo(req.session));
});

// cartModel.adjustQuantity()
router.post('/adjustQuantity', (req, res) => {
    return res.json(cartModel.adjustQuantity(req.session, req.body.itemID, req.body.newQuantity));
});

// cartModel.checkout()
router.post('/checkout', (req, res) => {
    res.send([]);
});

// cartModel.addToCart() 
// Expects req.body.productID
router.post('/addToCart', (req, res) => {
    cartModel.addToCart(req.session, req.body.productID, (result) => {
        return res.json(result);
    });
});

// cartModel.removeFromCart()
// Expects req.body.productID
router.post('/removeFromCart', (req, res) => {
    return res.json(cartModel.removeFromCart(req.session, req.body.productID));
});

module.exports = router;