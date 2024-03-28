
const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;

router.use(express.json());

/*
Returns a list of Cart Items to display on the cart page. 
takes in nothing
returns List [ {
    itemID:
    itemName:
    quantity:
    price:
} ]
*/
router.get('/cartItems', (req, res) => {
    res.send([]);
});

/*
Adjusts the database quantity of an item in the user's cart and removes it if quantity is zero. 
takes in {
    itemID:
    newQuantity:
}
returns true for success, false for not success
*/
router.get('/adjustQuantity', (req, res) => {
    res.send([]);
});

/*
Checks out the user, clears their cart. Frontend will redirct them to home if successful
takes in {
    firstName:
    lastName:
    address:
    cardNumber:
    expDate:
    cvv:
}
returns successful/not
*/
router.post('/checkout', (req, res) => {
    res.send([]);
});

