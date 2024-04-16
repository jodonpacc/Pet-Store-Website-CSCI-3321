const db = require("../db_connection.js").db_connection;
const CartInfo = require("./CartInfo.js").cart;
const ProductInfo = require("./CartInfo.js").product;

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
function getCartItems(session) {
    // if user has no cart, return empty list []
    // otherwise,

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

/*
Adds one of a product to the user's cart
takes in {
    session: (contains a field cart, which is a CartInfo object)
    int productID:
}
returns true for success, false for not success
*/
function addToCart(session, productID) {
    // check if user has a cart, if not, create an empty one
    if(!session.cart) {
        session.cart = new CartInfo();
    }

    // Construct cart Map from entries (can't save a Map in session, have to save its entries, an Array, and construct a new Map from that)
    let map = new Map(cart.entries);
    // Check if product is already in cart
    if(map.has(productID)) {
        // Increment its quantity
        map.get(productID).quantity += 1;
    } else {
        // Retreive product title and price from DB
        const title = "";
        const price = 0;

        // Add new entry to the cart
        map.set(productID, new ProductInfo(title, price, 1));

        // Update subtotal, tax, and total
    }

    // Convert the map into an array of key-value pairs to be stored in session
    session.cart.entries = Array.from(map.entries());
}

module.exports = {getCartItems, adjustQuantity, checkout};