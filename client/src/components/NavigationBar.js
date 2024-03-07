import "./NavigationBar.css"
import CartIcon from "../assets/images/cart.png"

function NavigationBar() {

    const gotoCart = (e) => {
        window.location.href = "/Cart";
    }

    return (
        <div id="nav-bar">
            <div id="nav-sections"> 
                <div id="left-items">
                    <div className="logo">PetSmarter</div>
                    <input type="text" placeholder="Search..." maxLength="40"></input>
                </div>
                <div id="right-items">
                    <img src={CartIcon} onClick={gotoCart} style={{width: 20, height: 20}}></img>
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