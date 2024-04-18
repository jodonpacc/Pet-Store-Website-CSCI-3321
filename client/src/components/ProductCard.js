// The orange rounded rectangle with product image and product title seen on the homepage of the mockup
import "./Card.css"

function ProductCard({ id, imgname, title, destination }) {

    const imglink = "../assets/images/" + imgname
    const gotoDest = (e, destination) => {
        e.preventDefault();
        window.location.href = destination;
    }

    return (
        <div className="product-card" id={id} onClick={(e) => gotoDest(e, destination)}>
            <div className="image-backer">
                <img src={imglink}></img>
            </div>
            <div className="product-card-title">{title}</div>
        </div>
    );
}

export default ProductCard;