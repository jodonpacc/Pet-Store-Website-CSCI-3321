// The orange rounded rectangle with product image and product title seen on the homepage of the mockup
import "./Card.css"

function ProductCard({id, img, title, destination}) {

    const gotoDest = (e) => {
        //fetch
    }  

    return (
        <div className="product-card" id={id}>
            <div className="image-backer">
                <img>{img}</img>
                image
            </div>
            <div className="product-card-title" onclick={gotoDest}>{title}</div>
        </div>
    );
}

export default ProductCard;