import '../CSS/style.css';

function Login() {
    return (
        <>
            <head>
                <title>Log In/Sign Up</title>
                <meta charset="UTF-8" />
            </head>
            <body class="login-page">
                <h1 class="page-title">PetSmarter<span class="copy-symbol">&copy;</span></h1>
                <div class="login">
                    <div class="subtitle">
                        <h2>Please Log In</h2>
                    </div>

                    <form class="user-pass">
                        <input type="text" class="login-input" name="Username" id="user" placeholder="Username:" minlength="5" maxlength="20"></input>
                        <input type="password" class="login-input" name="Password" id="pass" placeholder="Password:" minlength="8" maxlength="20"></input>

                        <div class="login-submit">
                            <input type="submit" class="login-button" name="login-button" id="login-button" value="Sign In"></input>
                        </div>
                    </form>
                </div>
                <h3>or</h3>
                <div class="signup">
                    <div class="subtitle">
                        <h2>Sign Up</h2>
                    </div>

                    <div class="user-pass">
                        <input type="text" class="login-input" name="Username" id="user" placeholder="Set Username:" minlength="5" maxlength="20"></input>
                        <input type="password" class="login-input" name="Password" id="pass" placeholder="Set Password:" minlength="8" maxlength="20"></input>
                        <input type="password" class="login-input" name="Password" id="pass" placeholder=" Confirm Password:" minlength="8" maxlength="20"></input>
                    </div>

                    <div class="signup-submit">
                        <input type="submit" class="signup-button" name="signup-button" id="signup-button" value="Create Account"></input>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Login;