import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import NavigationBar from "../components/NavigationBar";
import './Home.css'

function HomePage({}) {

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
                <div className="fake-hr"></div>
                <div id="product-array">
                    <ProductCard title={"Product Card"}/>
                    <ProductCard title={"Product Card"}/>
                    <ProductCard title={"Product Card"}/>
                    <ProductCard title={"Product Card"}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;