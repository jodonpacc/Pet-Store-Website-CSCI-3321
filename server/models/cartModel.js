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
function getCartInfo(session) {
    let ret = [];
    if(session.cart) {
        for(let i = 0; i<session.cart.entries.length; i++) {
            const entry = session.cart.entries[i];
            ret.push({itemID: entry[0], itemName: entry[1].title, quantity: entry[1].quantity, price: entry[1].price });
        }
        // return the cart information
        return { items: ret, subtotal: session.cart.subtotal, tax: session.cart.tax, total: session.cart.total };
    } else {
        return { items: ret, subtotal: 0.0, tax: 0.0, total: 0.0 };
    }
}

/*
Adjusts the database quantity of an item in the user's cart and removes it if quantity is zero. 
takes in {
    session:
    itemID:
    newQuantity:
}
returns info containing new money info {
    subtotal:
    tax:
    total:
}
*/
function adjustQuantity(session, itemID, newQuantity) {
    let cartInfo = new CartInfo(session.cart);
    if(cartInfo.setQuantity(itemID, newQuantity)) {
        session.cart = {entries: Array.from(cartInfo.cartmap.entries()), subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total };
        return {subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total};
    } else {
        return undefined;
    }
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

    // Other stuff like update product stock
}

/*
Adds one of a product to the user's cart
takes in {
    session: (contains a field cart, which is a CartInfo object)
    int productID:
}
returns true for success, false for not success
*/
function addToCart(session, productID, callback) {
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

                // return successful
                callback("Successfully added product to cart.");
            } else {
                // return you cant do that, product is not available
                callback("This product is unavailable.");
            }
        })
        .catch(err => {
            // return error
            console.log(err);
            callback(err);
        })
}

/* Given a product ID, removes a product from the user's cart
Gets cart info from session, calls CartInfo.removeItem(productID) and
returns info containing new money info {
    subtotal:
    tax:
    total:
}
*/
function removeFromCart(session, productID) {
    let cartInfo = new CartInfo(session.cart);
    const success = cartInfo.removeItem(productID);
    session.cart = {entries: Array.from(cartInfo.cartmap.entries()), subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total };
    return success ? {subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total} : undefined;
}

module.exports = {getCartInfo, adjustQuantity, checkout, addToCart, removeFromCart};