import NavigationBar from "../../components/NavigationBar";
import IconText from "../../components/IconText";
import {React, useEffect, useState} from 'react';
import './Cart.css';
import axios from 'axios';

const fakeItem = {
    itemID: 69,
    itemName: "Fake Cat Food",
    quantity: 397,
    price: 51.5,
}

function CartItem({id, name, quantity, price, deleteSelf}) {
    const [itemCount, setItemCount] = useState(quantity)

    const updateQuantity = (e) => {
        if (parseInt(e.target.value) === 0) {
            fetch("adjustQuantity?itemID=" + id + "&newQuantity=" + e.target.value) //handle bad inputs at some point. 
            // Still need to call this so backend deletes it. Probably hackable lol
            deleteSelf()
        } else {
            fetch("adjustQuantity?itemID=" + id + "&newQuantity=" + e.target.value) //handle bad inputs at some point
            setItemCount(e.target.value)
        }
    }

    return (
        <div className="cart-item">
            <div className="item-fields">
                <div className="prod-name">{name}</div>
                x<input className="quantity" type="number" value={itemCount} onChange={updateQuantity}></input>
                <div className="price">${price}</div>
            </div>
            <div className="fake-hr"></div>
        </div>
    )
}

function CartPage({}) {
    // This line must be present on every main page so that session information is circulated properly
    axios.defaults.withCredentials = true;

    const [checkoutData, setCheckoutData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        cardNumber: "",
        expDate: "",
        cvv: "",
    })

    // Retrieves all the items in a user's cart in the form of:
    /*
    [ {
        itemID:
        itemName:
        quantity:
        price:
    } ]
    */
    const [cartItems, setCartItems] = useState([fakeItem, fakeItem])

    useEffect(() => {
        fetch('cartItems').then(data => {
            if (data) {
                setCartItems(data)
            }
            console.log("Failed to fetch cart items")
            setCartItems([fakeItem, fakeItem])
        })
    }, [])

    // Deletes an item. Called when quantity is edited to zero
    const deleteItem = (id) => {
        setCartItems((items) => items.filter(item => item.itemID !== id))
    }

    /*
    Checks out the user and sends the checkout info to the server
    {
        firstName:
        lastName:
        address:
        cardNumber:
        expDate:
        cvv:
    } */
    const checkout = () => {
        fetch("", 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(checkoutData)
        }).then(data => {
            if (data) {
                window.location.href = "/home"
            }
        })
    }
 
    return (
        <div id="cart-page">
            <NavigationBar/>
            <div id="cart-sections">
                <div id="cart-description" style={{width: window.innerWidth / 2}}>
                    <div id="cart-desc-header">
                        <IconText icon="cart" text="Cart Items" size={25}/>
                    </div>
                    <div className="fake-hr"></div>
                    <div id="items">
                        {cartItems.map((item, idx) => (
                            <CartItem key={idx} id={item.itemID} name={item.itemName} price={item.price} quantity={item.quantity} deleteSelf={() => deleteItem(item.itemID)}/>
                        ))}
                    </div>
                </div>
                <div id="checkout">
                    <div id="transaction-info">
                        <div id="subtotal">
                            <div id="sub-name">Subtotal:</div>
                            <div id="sub-amt">Field Value</div>
                        </div>
                        <div id="tax">
                            <div id="tax-name">Tax:</div>
                            <div id="tax-amt">Field Value</div>
                        </div>
                        <div id="total">Total:</div>
                    </div>
                    <form id="checkout-form">
                        <div id="card-info">
                            <input type="text" className="checkout-input-sm" placeholder="Card Exp. Date" required="required"></input>
                            <input type="text" className="checkout-input-sm" placeholder="CVV" required="required"></input>
                        </div>
                        <input type="text" className="checkout-input" placeholder="Credit Card #" required="required"></input>
                        <input type="text" className="checkout-input" placeholder="Address, Zip, City, State" required="required"></input>
                        <input type="submit" id="checkout-button" value="Purchase"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CartPage;