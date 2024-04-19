import fullStarImg from '../../assets/images/fullStar.png';
import halfStarImg from '../../assets/images/halfStar.png';
import "./ProductView.css"
import NavigationBar from "../../components/NavigationBar";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../helperFunctionality/sessionInfo'
import AuditTrail from '../../components/AuditTrail';

function ProductView() {
    // This line must be present on every main page so that session information is circulated properly
    axios.defaults.withCredentials = true;
    const productId = useParams().productId;

    const [productData, setProduct] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    // Fetch product info from backend in the form of:
    /* {
        title:
        description:
        price:
        img_filename:
        rating:
    } */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:9000/product', { prod_id: productId });
                setProduct(response.data); // Store the fetched data in state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function

        // Figures out if user is admin or not
        getUserInfo((res) => {
            if(res.valid) {
                // If res.is_admin is true, the audit log will display
                setIsAdmin(res.is_admin);
            } else {
                setIsAdmin(false);
            }
        });
    }, []);
    
    const addToCart = (event) => {
        axios.post('http://localhost:9000/cart/addToCart', { productID: productId })
            .then(res => {
                console.log(res)
                alert(res.data);
                if(res.data === "Successfully added product to cart.") {
                    window.location.href = 'http://localhost:3000/Cart';
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div class="PVcontainer">
                <div class="PVleft">
                    <img src={"../../assets/images/" + productData.img_filename} class="PVimg" alt="Product" style={productData.removed ? {backgroundColor: 'grey'} : {}}></img>
                    <div class="PVprice">${productData.price}</div>
                </div>
                <div class="PVright">
                    <h1 id="PVtitle">{productData.title} <span>{productData.removed ? '(UNAVAILABLE)' : ''}</span></h1>
                    <div id="PVtitle-line"></div>
                    {starGenerator(productData.rating)}
                    <p><span class="product-description">Description: </span>{productData.description}</p>
                    <p><span class="product-description">In stock: </span>{productData.quantity} product(s)</p>
                    <button id="addToCartBtn" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
            {isAdmin && <AuditTrail id={productId}/>}
        </div>
    );
}

function starGenerator(rating) {
    const fullStarNum = Math.floor(rating);
    const stars = []
    //each key is just a unique id for a star because console was yelling at us
    for (let i = 0; i < fullStarNum; i++) {
        stars.push(<img key={i} src={fullStarImg} class="PVstar"></img>)
    }
    //if product has half a start at the end
    if ((rating - fullStarNum) >= 0.5) {
        stars.push(<img key={fullStarNum + 1} src={halfStarImg} class="PVstar" id="PVhalf-star"></img>)
    }
    return (
        <div id="star-container">
            {stars}
        </div>
    )
}

export default ProductView;