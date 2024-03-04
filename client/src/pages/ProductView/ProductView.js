import defaultProductImg from '../../assets/images/img.png';
import "../../assets/styles/global.css"

function ProductView(productID) {
    // const name = getDatabaseName(productID)
    // const productImg = getDatabaseImg(productID)

    const name = "Blue Wilderness Cat Food"
    const productImg = defaultProductImg

    return (
        <>
            <head>
                <title>Home Page</title>
                <meta charset="UTF-8" />
            </head>
            <body>
                <h1>{name}</h1>
                <img src={productImg} alt="Product"></img>
            </body>
        </>
    );

}

export default ProductView;