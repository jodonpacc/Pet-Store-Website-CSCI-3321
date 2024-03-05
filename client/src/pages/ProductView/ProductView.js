import defaultProductImg from '../../assets/images/img.png';
import "../../assets/styles/global.css"
import "./ProductView.css"
import axios from 'axios'



function ProductView(productID) {
    console.log("routing works");
    axios.get('http://localhost:9000/product', {
        params: {
            productID: productID
        }
    })
        .then((productData) => {
            // const name = productData[title]
            // const description = productData[description]
            // const price = productData[price]
            // const productImg = productData[img_filename]
            // const rating = productData[rating]


            const name = "Product Title"
            const description = "Placeholder description"
            const price = 39.99
            const productImg = defaultProductImg
            const rating = 4.5

            return (
                <>
                    <head>
                        <title>Product Page</title>
                        <meta charset="UTF-8" />
                    </head>
                    <body>
                        <div class="left">
                            <img src={productImg} alt="Product"></img>
                            <div class="price">${price}</div>
                        </div>
                        <div class="right">
                            <h1>{name}</h1>
                            <p><span class="productDesHeader">Product description: </span>{description}</p>
                        </div>
                    </body>
                </>
            );
        })
        .catch(error => {
            // Handle error
            console.log("can't find product")
            return (<><p>NEED TO MAKE ERROR PAGE</p></>);
        });



}

export default ProductView;