import NavigationBar from "../../components/NavigationBar";
import IconText from "../../components/IconText";
import {React, useEffect, useState} from 'react';
import './Cart.css'

function CartItem({id, name, quantity, price, deleteSelf}) {
    const [itemCount, setItemCount] = useState(quantity)

    const updateQuantity = (e) => {
        if (e.target.value === 0) {
            fetch("adjustQuantity?itemID=" + id + "&newQuantity=" + e.target.value) //handle bad inputs at some point. 
            // Still need to call this so backend deletes it. Probably hackable lol
            deleteSelf()
        } else {
            fetch("adjustQuantity?itemID=" + id + "&newQuantity=" + e.target.value) //handle bad inputs at some point
            setItemCount(e.target.value)
        }
    }

    return (
        <div className="cart-item" id={id}>
            <div className="item-fields">
                <div className="prod-name">{name}</div>
                <input className="quantity" value={quantity} onChange={updateQuantity}>x{quantity}</input>
                <div className="price">${price}</div>
            </div>
            <div className="fake-hr"></div>
        </div>
    )
}

function CartPage({}) {
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
    const [cartItems, setCartItems] = useState(fetch('cartItems').then(data => {
        if (data) {
            return data
        }
        console.log("Failed to fetch cart items")
        return null
    }))

    // placeholder
    useEffect(() => {
        setCartItems(["Cat food", "Catnip"])
    }, [])

    // Deletes an item. Called when quantity is edited to zero
    const deleteItem = (id) => {
        setCartItems((items) => {
            items.filter(item => {
                return (item.itemID !== id) 
            })
        })
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
                        <IconText icon="cart" text="Cart" size={20}/>
                    </div>
                    <div className="fake-hr"></div>
                    <div id="items">
                        {cartItems.map(item => {
                            <CartItem id={item.itemID} name={item.name} price={item.price} quantity={item.quantity} deleteSelf={() => deleteItem(item.itemID)}/>
                        })}
                    </div>
                </div>
                <div id="checkout">
                    Checkout
                </div>
            </div>
        </div>
    );
}

export default CartPage;