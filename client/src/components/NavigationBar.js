import "./NavigationBar.css"
import CartIcon from "../assets/images/cart.png"
import { React, useEffect, useState } from 'react';
import { getUserInfo } from '../helperFunctionality/sessionInfo'
import axios from 'axios';

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
                setUserInfo({isLoggedIn: true, isAdmin: res.is_admin});
            } else {
                // show log in button
                setUserInfo({isLoggedIn: false, isAdmin: false});
            }
        });
    }, []);

    const gotoPage = (page) => {
        window.location.href = "/" + page;
    };

    // When Log Out button is pressed
    const logOut = () => {
        axios.post('http://localhost:9000/account/logout')
            .then(res => {
                alert(res.data);
                setUserInfo({isLoggedIn: false, isAdmin: false});
                
                // Redirect to the Login page?
                window.location.href = "/Login";
            })
            .catch(err => console.log(err));
    }

    return (
        <div id="nav-bar">
            <div id="nav-sections"> 
                <div id="left-items">
                    <div className="logo">PetSmarter</div>
                    <input type="text" id="search-bar" placeholder="Search..." maxLength="40"></input>
                    {userInfo.isAdmin && <button id="admin-button" onClick={() => gotoPage('admin')}>Admin</button>}
                </div>
                <div id="right-items">
                    <img src={CartIcon} onClick={() => gotoPage('Cart')} alt="Cart Icon" style={{width: 40, height: 40}}></img>
                    {userInfo.isLoggedIn
                        ? <button className="login-out-button" onClick={logOut}>Log Out</button>
                        : <button className="login-out-button" onClick={() => gotoPage('login')}>Log In</button>}
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