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
            <h1 class="page-title">PetSmarter<span class="copy-symbol">&copy;</span></h1>
            <div class="main-page">
                <div class="login">
                    <div class="subtitle">
                        <h2>Please Log In</h2>
                    </div>

                    <form class="user-pass" onSubmit={handleLoginSubmit}>
                        <input type="text" class="login-input" name="Username" id="user" placeholder="Username:" required="required" minlength="5" maxlength="20"
                            onChange={e => setLoginValues({ ...loginValues, username: e.target.value })}></input>
                        <input type="password" class="login-input" name="Password" id="pass" placeholder="Password:" required="required" minlength="8" maxlength="20"
                            onChange={e => setLoginValues({ ...loginValues, password: e.target.value })}></input>

                        <div class="login-submit">
                            <input type="submit" class="login-button" name="login-button" id="login-button" value="Sign In"></input>
                        </div>
                    </form>
                </div>
                <h3 class="or-text">or</h3>
                <div class="signup">
                    <div class="subtitle">
                        <h2>Sign Up</h2>
                    </div>

                    <form class="user-pass" onSubmit={handleAccountSubmit}>
                        <input type="text" class="login-input" name="Username" id="user" placeholder="Set Username:" required="required" minlength="5" maxlength="20"
                            onChange={e => setAccountValues({ ...accountValues, username: e.target.value })}></input>
                        <input type="password" class="login-input" name="Password" id="pass" placeholder="Set Password:" required="required" minlength="8" maxlength="20"
                            onChange={e => setAccountValues({ ...accountValues, password: e.target.value })}></input>
                        <input type="password" class="login-input" name="Password" id="pass" placeholder=" Confirm Password:" required="required" minlength="8" maxlength="20"
                            onChange={e => setAccountValues({ ...accountValues, passwordConfirm: e.target.value })}></input>

                        <div class="signup-submit">
                            <input type="submit" class="signup-button" name="signup-button" id="signup-button" value="Create Account"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;