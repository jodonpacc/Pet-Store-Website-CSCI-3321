import "./NavigationBar.css"

function NavigationBar() {

    return (
        <div id="nav-bar">
            <div id="nav-sections"> 
                <div id="left-items">
                    <div className="logo">PetSmarter</div>
                    <input type="text" placeholder="Search..." maxLength="40"></input>
                </div>
                <div id="right-items">
                    <div>Cart</div>
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