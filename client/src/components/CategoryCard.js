// A product card, but designed for a category. Will likely link to a search query with a filter for the category "cat food", etc.
import "./Card.css"


function CategoryCard({id, img, title, destination}) {

    const gotoDest = (e) => {
        //fetch
    }  

    return (
        <div className="cat-card" id={id}>
            <div className="image-backer">
                <img>{img}</img>
                image
            </div>
            <div className="category-card-title" onclick={gotoDest}>{title}</div>
        </div>
    );
}

export default CategoryCard;