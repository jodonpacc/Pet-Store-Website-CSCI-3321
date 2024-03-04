function Login() {
    return (
        <>
            <head>
                <title>Log In/Sign Up</title>
                <meta charset="UTF-8" />
            </head>
            <body>
                <h1>PetSmarter</h1>
                <div class="login">
                    <div class="subtitle">
                        <h2>Please Log In</h2>
                    </div>

                    <form class="user-pass">
                        <input type="text" name="Username" id="user" placeholder="Username" minlength="5" maxlength="20"></input>
                        <input type="password" name="Password" id="pass" placeholder="Password" minlength="8" maxlength="20"></input>

                        <div class="login-submit">
                            <input type="submit" name="login-button" id="login-button" value="Log In!"></input>
                        </div>
                    </form>
                </div>
                <div class="signup">
                    <h3>First time? Create an account!</h3>

                    <div class="user-pass">
                        <input type="text" name="Username" id="user" placeholder="Username" minlength="5" maxlength="20"></input>
                        <input type="password" name="Password" id="pass" placeholder="Password" minlength="8" maxlength="20"></input>
                        <input type="password" name="Password" id="pass" placeholder=" Confirm password" minlength="8" maxlength="20"></input>
                    </div>

                    <div class="signup-submit">
                        <input type="submit" name="signup-button" id="signup-button" value="Create account"></input>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Login;