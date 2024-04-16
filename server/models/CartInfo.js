// Contains info regarding the user's cart, saved in session
class CartInfo {
    entries; // An Array of key-value pairs that represents a Map<int, ProductInfo> (can't save a Map in session)
    subtotal = 0;
    tax = 0;
    total = 0;
}

// ProductInfo is a container class for fields title, price, and quantity
// Contained in the Map represented in CartInfo
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

module.exports = {
    cart: CartInfo,
    product: ProductInfo
}