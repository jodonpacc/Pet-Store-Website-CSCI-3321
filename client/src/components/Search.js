// The searchbar used in the navigationbar
import "./Search.css"
import { React, useEffect, useState } from 'react';

function Search({items}) {
    const [results, setResults] = useState([])

    const navToProduct = (id) => {
        window.location.href = "/product/" + id;
    }

    // Split up words used in the search by space
    // If any word in the search is included in the title, show up. Limit to 5 entires.
    const lookup = (e) => {
        const queryItems = e.target.value.split(" ")
        if (queryItems.length > 0) {
            var newItems = items.filter((item) => {
                return queryItems.some(query => item.title.toLowerCase().includes(query.toLowerCase()))// || item.description.includes(query)) 
            }) 
            if (newItems.length > 5) {
                newItems = newItems.slice(0, 5)
            }
            setResults(newItems)
        }
    }

    return (
        <div>
            <input type="text" id="search-bar" placeholder="Search..." maxLength="40" onChange={lookup}></input>
            {results.length > 0 && 
                <div className="dropdown">
                    {results.map((item) => { return (
                        <div className="result" key={item.product_id} onClick={(e) => navToProduct(item.product_id)}>
                            {item.title}
                            <hr></hr>
                        </div> 
                    )})}
                </div>
            }
        </div>
    );
}

export default Search;