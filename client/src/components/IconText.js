// Just an icon and the right with some text on the left.
import CartIcon from "../assets/images/cart.png"
import "./IconText.css"

const iconToSrc = {
    "cart": CartIcon
}

function IconText({icon, text, size}) {
    const image = iconToSrc[icon]

    return (
        <div className="icon-text" style={{gap: size / 2}}>
            <img src={image} style={{width: size, height: size}}></img>
            <div style={{fontSize: size}}>{text}</div>
        </div>
    );
}

export default IconText;