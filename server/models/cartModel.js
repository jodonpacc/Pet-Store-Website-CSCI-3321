const db = require("../db_connection.js").db_connection;
const CartInfo = require("./CartInfo.js");

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
    if(session.cart) {

    } else {
        // if user has no cart, return empty list []
        return [];
    }
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
    // Clear user cart
    session.cart = undefined;

    // Other stuff
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
    // Create a new CartInfo with cart info from session
    // If session.cart is undefined, an empty CartInfo will be created
    let cartInfo = new CartInfo(session.cart);
    
    // Retreive title, price, and removed for the given product
    let sql = "SELECT title, price, removed FROM Product WHERE product_id = $1";
    db.query(sql, [productID])
        .then(result => {
            prod_info = result.rows[0];
            if(!prod_info.removed) {
                cartInfo.addItem(prod_info.title, prod_info.price, productID);

                // Store the CartInfo in session, but replace cartmap with entries, an Array form of cartmap (explained in CartInfo.js constructor)
                session.cart = {entries: Array.from(cartInfo.cartmap.entries()), subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total };
                console.log("session.cart after adding item to cart: " + session.cart);

                // return successful
            } else {
                // return you cant do that, product is not available
            }
        })
        .catch(err => {
            // return error
        })
}

// Given a product ID, removes a product from the user's cart
// Gets cart info from session, calls CartInfo.removeItem(productID) and
// returns same value as CartInfo.removeItem()
function removeFromCart(session, productID) {
    let cartInfo = new CartInfo(session.cart);
    ret = cartInfo.removeItem(productID);
    session.cart = {entries: Array.from(cartInfo.cartmap.entries()), subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total };
    return ret;
}

module.exports = {getCartItems, adjustQuantity, checkout, addToCart, removeFromCart};