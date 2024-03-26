import NavigationBar from "../../components/NavigationBar";
import IconText from "../../components/IconText";
import {React, useEffect, useState} from 'react';
import './Cart.css';
import axios from 'axios';

function CartItem({id}) {

    return (
        <div className="cart-item" id={id}>
            <div className="item-fields">
                <div className="prod-name">Product Name</div>
                <div className="quantity">xQuantity</div>
                <div className="price">$Price</div>
            </div>
            <div className="fake-hr"></div>
        </div>
    )
}

function CartPage({}) {
    // This line must be present on every main page so that session information is circulated properly
    axios.defaults.withCredentials = true;

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        setCartItems(["Cat food", "Catnip"])
    }, [])

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
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
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