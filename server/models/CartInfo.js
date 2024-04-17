var formatterUSD = new Intl.NumberFormat('en-US');

// Contains info regarding the user's cart, saved in session
class CartInfo {
    cartmap; // A Map<int, ProductInfo>, int is the product_id
    subtotal = 0.0;
    tax = 0.0;
    total = 0.0;

    /* Takes in the object that is saved to session.cart and creates a CartInfo
    if session.cart hasn't been defined yet, an empty CartInfo will be created
    sessionCart has the fields {
        entries: An Array of key-value pairs that can be used to create the cartmap
                (can't save a Map in session because it can't be serialized/deserialized without us manually making that possible)
        subtotal:
        tax:
        total:
    }
    */
    constructor(sessionCart) {
        if(sessionCart) {
            this.cartmap = new Map(sessionCart.entries);
            this.subtotal = sessionCart.subtotal;
            this.tax = sessionCart.tax;
            this.total = sessionCart.total;
        } else {
            this.cartmap = new Map();
        }
    }

    // Functions
    // Adds an item to the cart
    // If item is already in the cart, it increments the quantity of the product
    addItem(title, price, product_id) {
        if(this.cartmap.has(product_id)) {
            this.cartmap.get(product_id).quantity += 1;
        } else {
            this.cartmap.set(product_id, new ProductInfo(title, price, 1));
        }

        // Update money fields
        this.subtotal = parseFloat(formatterUSD.format(this.subtotal + parseFloat(price)));
        this.tax = parseFloat(formatterUSD.format(this.subtotal * 0.0825));
        this.total = parseFloat(formatterUSD.format(this.subtotal + this.tax));
    }

    // Removes a product from the cart
    // Returns true if successful, false otherwise
    removeItem(product_id) {
        const price = this.cartmap.has(product_id) ? this.cartmap.get(product_id).price : 0.0;
        if(this.cartmap.delete(product_id)) {
            // Update money fields
            this.subtotal = parseFloat(formatterUSD.format(this.subtotal - parseFloat(price)));
            this.tax = parseFloat(formatterUSD.format(this.subtotal * 0.0825));
            this.total = parseFloat(formatterUSD.format(this.subtotal + this.tax));
            return true;
        } else {
            return false;
        }
    }

    // Sets the quantity of a given product in the cart
    setQuantity(product_id, newQuantity) {
        
    }
}

// ProductInfo is a container class for fields title, price, and quantity
// Contained in the Map represented in CartInfo
// DO NOT GIVE THIS CLASS ANY FUNCTIONS, they will be lost when serialized (when saved in session)
class ProductInfo {
    title; // Title of the product as defined in the DB
    price; // Price of the product as defined in the DB
    quantity; // Quantity that this product appears in the Cart that contains it
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}

module.exports = CartInfo;