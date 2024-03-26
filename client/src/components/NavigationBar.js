import "./NavigationBar.css"
import CartIcon from "../assets/images/cart.png"
import { React, useEffect, useState } from 'react';
import { getUserInfo } from '../helperFunctionality/sessionInfo'

function NavigationBar() {

    // Keeps track of username and admin status for displaying correct buttons
    const [userInfo, setUserInfo] = useState({
        isLoggedIn: false,
        isAdmin: false
    });

    // Gets user session info, updates state with username and is_admin
    useEffect(() => {
        getUserInfo((res) => {
            if(res.valid) {
                // show log out button and admin button if admin
                setUserInfo({isLoggedIn: true, isAdmin: res.is_admin === 1});
            } else {
                // show log in button
                setUserInfo({isLoggedIn: false, isAdmin: false});
            }
        });
    }, []);

    // When the cart icon is pressed
    const gotoCart = (e) => {
        window.location.href = "/Cart";
    }

    // When admin button is pressed
    const gotoAdmin = (e) => {
        window.location.href = "/Admin";
    }

    // When Log In button is pressed
    const gotoLogin = (e) => {
        window.location.href = "/Login";
    }

    // When Log Out button is pressed
    const logOut = (e) => {
        // in progress
    }

    return (
        <div id="nav-bar">
            <div id="nav-sections"> 
                <div id="left-items">
                    <div className="logo">PetSmarter</div>
                    <input type="text" placeholder="Search..." maxLength="40"></input>
                    {userInfo.isAdmin && <button id="admin-button" onClick={gotoAdmin}>Admin</button>}
                </div>
                <div id="right-items">
                    <img src={CartIcon} onClick={gotoCart} style={{width: 20, height: 20}}></img>
                    {userInfo.isLoggedIn
                        ? <button className="login-out-button" onClick={logOut}>Log Out</button>
                        : <button className="login-out-button" onClick={gotoLogin}>Log In</button>}
                    <div className="other-button">
                        <div className="other-tick"></div>
                        <div className="other-tick"></div>
                        <div className="other-tick"></div>
                    </div>
                </div>
            </div>
            <div className="fake-hr"></div>
        </div>
    );
}

export default NavigationBar;