import ProductCard from "../../components/ProductCard";
import React, { useState, useEffect } from 'react';
import CategoryCard from "../../components/CategoryCard";
import NavigationBar from "../../components/NavigationBar";
import './Home.css'
import axios from 'axios';

function HomePage({ }) {

    // This line must be present on every main page so that session information is circulated properly
    axios.defaults.withCredentials = true;
    const [products, setProducts] = useState([]);

    // useEffect make the Axios request when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/product/allProducts');
                setProducts(response.data); // Store the fetched data in state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function
    }, []);
    console.log(products)

    return (
        <div id="home-page">
            <NavigationBar />
            <div id="padded-center">
                {/* not supporting categories
                 <div id="featured-categories">
                    <CategoryCard title={"Product Category"} />
                    <CategoryCard title={"Product Category"} />
                    <CategoryCard title={"Product Category"} />
                </div> */}
                <div id="all-products-label">
                    All Products:
                </div>
                <div className="home-fake-hr"></div>
                <div id="product-array">
                    {products.map((product, index) => (
                        //key is just something React requires
                        <ProductCard key={index} imgname={product.img_filename} title={product.title} destination={"/product"} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;