import React from 'react';

function AdminProduct({id, name, description, quantity, price, img, buttonFunction, buttonName}) {

    return (
        <li>
            <div>Product ID: {id}</div>
            <div>Title: {name}</div>
            <div>Description {description}</div>
            <div>Quantity {quantity}</div>
            <div>Price {price}</div>
            <img src={'/assets/images/' + img} width="100" height="100"></img>
            <button onClick={buttonFunction}>{buttonName}</button>
        </li>
    )
}

export default AdminProduct;