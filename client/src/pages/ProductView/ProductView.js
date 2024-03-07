import defaultProductImg from '../../assets/images/cat.png';
import fullStarImg from '../../assets/images/fullStar.png';
import halfStarImg from '../../assets/images/halfStar.png';
import "./ProductView.css"
import NavigationBar from "../../components/NavigationBar";
import axios from 'axios'



function ProductView(productID) {
    return placeholderPage();

    // console.log("routing works");
    // axios.get('http://localhost:9000/product', {
    //     params: {
    //         productID: productID
    //     }
    // })
    //     .then((productData) => {
    //         const name = productData.title
    //         const description = productData.description
    //         const price = productData.price
    //         // const productImg = productData.img_filename
    //         const productImg = defaultProductImg
    //         const rating = productData.rating

    //         return (
    //             <div>
    //                 <NavigationBar></NavigationBar>
    //                 <div class="PVcontainer">
    //                     <div class="PVleft">
    //                         <img src={productImg} class="PVimg" alt="Product"></img>
    //                         <div class="PVprice">${price}</div>
    //                     </div>
    //                     <div class="PVright">
    //                         <h1 id="PVtitle">{name}</h1>
    //                         <div id="PVtitle-line"></div>
    //                         {starGenerator(rating)}
    //                         <p><span class="product-description">Description: </span>{description}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     })
    //     .catch(error => {
    //         // Handle error
    //         console.log("can't find product")
    //         return (<><p>NEED TO MAKE ERROR PAGE</p></>);
    //     });
}

function placeholderPage() {
    const name = "Product Title"
    const description = "Placeholder description"
    const price = 39.99
    const productImg = defaultProductImg
    const rating = 4.5

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div class="PVcontainer">
                <div class="PVleft">
                    <img src={productImg} class="PVimg" alt="Product"></img>
                    <div class="PVprice">${price}</div>
                </div>
                <div class="PVright">
                    <h1 id="PVtitle">{name}</h1>
                    <div id="PVtitle-line"></div>
                    {starGenerator(rating)}
                    <p><span class="product-description">Description: </span>{description}</p>
                </div>
            </div>
        </div>
    );
}

function starGenerator(rating) {
    const fullStarNum = Math.floor(rating);
    const stars = []
    for (let i = 0; i < fullStarNum; i++) {
        stars.push(<img src={fullStarImg} class="PVstar"></img>)
    }
    if ((rating - fullStarNum) >= 0.5) {
        stars.push(<img src={halfStarImg} class="PVstar" id="PVhalf-star"></img>)
    }
    return (
        <div id="star-container">
            {stars}
        </div>
    )
}

export default ProductView;