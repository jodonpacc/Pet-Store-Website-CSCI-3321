import NavigationBar from "../../components/NavigationBar";
import IconText from "../../components/IconText";
import {React, useEffect, useState} from 'react';
import './Cart.css';
import axios from 'axios';

function CartItem({id, name, quantity, price, deleteSelf}) {
    const [itemCount, setItemCount] = useState(quantity)

    const updateQuantity = (e) => {
        if (parseInt(e.target.value) === 0) {
            // Still need to call this so backend deletes it. Probably hackable lol
            deleteSelf()
        } else {
            axios.post('http://localhost:9000/cart/adjustQuantity', { itemID: id, newQuantity: e.target.value }); //handle bad inputs at some point. 
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
            <div className="cart-fake-hr"></div>
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
    res {
        items: [ {
            itemID:
            itemName:
            quantity:
            price:
        } ]
        subtotal:
        tax:
        total:
    }
    */
    const [cartItems, setCartItems] = useState([])
    const [moneyInfo, setMoneyInfo] = useState({
        subtotal: 0.0,
        tax: 0.0,
        total: 0.0
    })

    useEffect(() => {
        axios.get('http://localhost:9000/cart/cartInfo').then(res => {
            console.log(res.data);
            if (res.data) {
                setCartItems(res.data.items);
                setMoneyInfo({ subtotal: res.data.subtotal, tax: res.data.tax, total: res.data.total });
            } else {
                console.log("Failed to fetch cart items");
            }
        })
    }, [])

    // Deletes an item. Called when quantity is edited to zero
    const deleteItem = (id) => {
        setCartItems((items) => items.filter(item => item.itemID !== id))
        axios.post('http://localhost:9000/cart/removeFromCart', { productID: id })
            .then(res => {
                if(res.data) {
                    setMoneyInfo(res.data);
                } else {
                    console.log("failed to remove product from cart");
                }
            })
            .catch(err => console.log(err));
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
        axios.post('http://localhost:9000/cart/checkout', checkoutData)
            .then(res => {
                if (res) {
                    window.location.href = "/home"
                }
            })
            .catch(err => console.log(err));
    }
 
    return (
        <div id="cart-page">
            <NavigationBar/>
            <div id="cart-sections">
                <div id="cart-description" style={{width: window.innerWidth / 2}}>
                    <div id="cart-desc-header">
                        <IconText icon="cart" text="Cart Items" size={25}/>
                    </div>
                    <div className="cart-fake-hr"></div>
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
                            <div id="sub-amt">{"$" + moneyInfo.subtotal}</div>
                        </div>
                        <div id="tax">
                            <div id="tax-name">Tax:</div>
                            <div id="tax-amt">{"$" + moneyInfo.tax}</div>
                        </div>
                        <div id="total">Total:</div>
                        <div id="total-amt">{"$" + moneyInfo.total}</div>
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