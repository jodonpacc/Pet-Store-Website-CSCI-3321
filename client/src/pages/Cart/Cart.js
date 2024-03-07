import NavigationBar from "../../components/NavigationBar";
import IconText from "../../components/IconText";
import {React, useEffect, useState} from 'react';
import './Cart.css'

function CartPage({}) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        setCartItems(["Cat food", "Catnip"])
    }, [])

    return (
        <div id="cart-page">
            <NavigationBar/>
            <div id="cart-sections">
                <div id="cart-description">
                    <IconText icon="cart" text="Cart" size={20}/>
                    <div className="fake-hr"></div>
                    <div></div>
                </div>
                <div id="checkout">
                </div>
            </div>
        </div>
    );
}

export default CartPage;