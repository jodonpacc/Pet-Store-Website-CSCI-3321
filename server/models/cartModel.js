const db = require("../db_connection.js").db_connection;

/*
Returns a list of Cart Items to display on the cart page. 
takes in the username of the user
returns List [ {
    itemID:
    itemName:
    quantity:
    price:
} ]
*/
function getCartItems(username) {

}

/*
Adjusts the database quantity of an item in the user's cart and removes it if quantity is zero. 
takes in {
    itemID:
    newQuantity:
}
returns true for success, false for not success
*/
function adjustQuantity(itemID, newQuantity) {
    
}

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
function checkout(orderInfo) {

}

modeule.exports = {getCartItems, adjustQuantity, checkout};