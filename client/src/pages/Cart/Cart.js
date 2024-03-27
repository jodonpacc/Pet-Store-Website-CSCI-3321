import NavigationBar from "../../components/NavigationBar";
import IconText from "../../components/IconText";
import {React, useEffect, useState} from 'react';
import './Cart.css'

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
                        <IconText icon="cart" text="Cart Items" size={25}/>
                    </div>
                    <div className="fake-hr"></div>
                    <div id="items">
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
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