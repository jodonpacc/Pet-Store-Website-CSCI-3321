import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import NavigationBar from "../../components/NavigationBar";
import './Home.css'
import axios from 'axios';

function HomePage({}) {

    // This line must be present on every main page so that session information is circulated properly
    axios.defaults.withCredentials = true;

    return (
        <div id="home-page">
            <NavigationBar/>
            <div id="padded-center">
                <div id="featured-categories">
                    <CategoryCard title={"Product Category"}/>
                    <CategoryCard title={"Product Category"}/>
                    <CategoryCard title={"Product Category"}/>
                </div>
                <div id="all-products-label">
                    All Products:
                </div>
                <div className="home-fake-hr"></div>
                <div id="product-array">
                    <ProductCard title={"Product Card"} destination="/product"/>
                    <ProductCard title={"Product Card"} destination="/product"/>
                    <ProductCard title={"Product Card"} destination="/product"/>
                    <ProductCard title={"Product Card"} destination="/product"/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;