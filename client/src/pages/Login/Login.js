import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    document.body.style.backgroundColor = '#2D3142'
    // Keeps track of the values the user has entered in the Log In fields
    const [loginValues, setLoginValues] = useState({
        username: '',
        password: ''
    });
    // Called when Sign In is pressed
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/account/login', loginValues)
            .then(res => {
                // server sends back one of the following responses:
                // "There is no account with the given username." + success: false
                // "The given password is incorrect." + success: false
                // "Successfully logged in as [username]." + success: true
                // Display the returned message
                console.log(res.data.message);
                if (res.data.success) {
                    // Do login stuff
                    window.location.href = "/home"
                    console.log("success");

                    if (res.data.isAdmin) {
                        // Do admin login stuff
                        console.log("admin user logged in");
                    }
                }
            })
            .catch(err => console.log(err));
    };

    // Keeps track of the values the user has entered in the Sign Up fields
    const [accountValues, setAccountValues] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    });
    // Called when Create Account is pressed
    const handleAccountSubmit = (e) => {
        e.preventDefault();
        if (accountValues.password === accountValues.passwordConfirm) {
            axios.post('http://localhost:9000/account/create_account', accountValues)
                .then(res => {
                    // server sends back one of the following responses
                    // "There is already an account associated with this username."
                    // "Account [username] successfully created. You may now log in."
                    // Display the returned message
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        } else {
            // display passwords do not match
            console.log('passwords do not match');
        }
    };

    return (

        <div id="login-page">
            <h1 className="page-title">PetSmarter<span className="copy-symbol">&copy;</span></h1>
            <div className="main-page">
                <div className="login">
                    <div className="subtitle">
                        <h2>Please Log In</h2>
                    </div>

                    <form className="user-pass" onSubmit={handleLoginSubmit}>
                        <input type="text" className="login-input" placeholder="Username:" required="required" minLength="5" maxLength="20"
                            onChange={e => setLoginValues({ ...loginValues, username: e.target.value })}></input>
                        <input type="password" className="login-input" placeholder="Password:" required="required" minLength="8" maxLength="20"
                            onChange={e => setLoginValues({ ...loginValues, password: e.target.value })}></input>

                        <div className="login-submit">
                            <input type="submit" className="login-button" value="Sign In"></input>
                        </div>
                    </form>
                </div>
                <h3 className="or-text">or</h3>
                <div className="signup">
                    <div className="subtitle">
                        <h2>Sign Up</h2>
                    </div>

                    <form className="user-pass" onSubmit={handleAccountSubmit}>
                        <input type="text" className="login-input" placeholder="Set Username:" required="required" minLength="5" maxLength="20"
                            onChange={e => setAccountValues({ ...accountValues, username: e.target.value })}></input>
                        <input type="password" className="login-input" placeholder="Set Password:" required="required" minLength="8" maxLength="20"
                            onChange={e => setAccountValues({ ...accountValues, password: e.target.value })}></input>
                        <input type="password" className="login-input" placeholder=" Confirm Password:" required="required" minLength="8" maxLength="20"
                            onChange={e => setAccountValues({ ...accountValues, passwordConfirm: e.target.value })}></input>

                        <div className="signup-submit">
                            <input type="submit" className="signup-button" value="Create Account"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;