const db = require("../db_connection.js").db_connection;
const CartInfo = require("./CartInfo.js");
const authenticateUser = require('./accountModel.js').authenticateUser;

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
function checkout(orderInfo, session, callback) {
    // Authenticate user (user cannot checkout unless they have an account)
    let sql3 = 'SELECT user_name FROM Customer WHERE user_name = $1'
    db.query(sql3, [session.username])
        .then(async (result) => {
            if(result.rows.length > 0) {
                let enoughStock = true;
                for(entry of session.cart.entries) {
                    let sql = 'SELECT quantity FROM Product WHERE product_id = $1';
                    const result = await db.query(sql, [entry[0]]);
                    if(result.rows[0].quantity < entry[1].quantity) {
                        enoughStock = false;
                    }
                }
    
                if(enoughStock) {
                    // Insert PlacedOrder entry into database
                    let sql = 'INSERT INTO PlacedOrder (order_subtotal, user_name) VALUES ($1, $2) RETURNING order_id';
                    db.query(sql, [session.cart.subtotal, session.username])
                        .then(async (result) => {
                            const order_id = result.rows[0].order_id;
                            for(entry of session.cart.entries) {
                                let sql = 'INSERT INTO OrderProduct (quantity, order_id, product_id) VALUES ($1, $2, $3)';
                                await db.query(sql, [entry[1].quantity, order_id, entry[0]]);
    
                                let sql2 = 'UPDATE Product SET quantity = quantity - $1 WHERE product_id = $2';
                                await db.query(sql2, [entry[1].quantity, entry[0]]);
                            }
    
                            // Clear user cart
                            session.cart = undefined;
                            const orderConf = order_id + '';
                            callback('Checkout successful. Confirmation number: PS#' + orderConf.padStart(12, '0'));
                        })
                        .catch(err2 => {
                            console.log(err2);
                            callback(err2);
                        })
                } else {
                    callback('One of the products in your cart does not have enough stock for this purchase.');
                }
            } else {
                callback('You must be logged into a PetSmarter account to checkout.');
            }
        })
        .catch(err => {
            console.log(err);
            callback(err);
        })
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
    let sql = "SELECT title, price, quantity, removed FROM Product WHERE product_id = $1";
    db.query(sql, [productID])
        .then(result => {
            prod_info = result.rows[0];
            if(!prod_info.removed && prod_info.quantity > 0) {
                cartInfo.addItem(prod_info.title, prod_info.price, productID);

                // Store the CartInfo in session, but replace cartmap with entries, an Array form of cartmap (explained in CartInfo.js constructor)
                session.cart = {entries: Array.from(cartInfo.cartmap.entries()), subtotal: cartInfo.subtotal, tax: cartInfo.tax, total: cartInfo.total };

                // return successful
                callback("Successfully added product to cart.");
            } else {
                // return you cant do that, product is not available or out of stock
                const message = prod_info.removed ? "This product is unavailable." : "This product is out of stock.";
                callback(message);
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