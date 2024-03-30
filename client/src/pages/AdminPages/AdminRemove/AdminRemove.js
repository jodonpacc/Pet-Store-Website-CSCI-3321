import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../../../components/Popup';

function Product({id, name, description, quantity, price, img, openDialog}) {

    return (
        <li>
            <div>Product ID: {id}</div>
            <div>Title: {name}</div>
            <div>Description {description}</div>
            <div>Quantity {quantity}</div>
            <div>Price {price}</div>
            <img src={'/assets/images/' + img} width="100" height="100"></img>
            <button onClick={openDialog}>Remove</button>
        </li>
    )
}

function AdminRemove() {
    axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [popupInfo, setPopupInfo] = useState({
        prod_id: 0,
        password: ''
    });

    // Populates the products list with all products in the database
    useEffect(() => {
        axios.get('http://localhost:9000/product/allProducts')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const promptPassword = (id) => {
        setOpen(true);
        setPopupInfo({ ...popupInfo, prod_id: id });
    }

    // Deletes an item from database and view (if user is authenticated successfully).
    // Called after administrator clicks confirm button on password prompt popup.
    // popupInfo has required info about which product (id) is being removed and the given password
    const deleteItem = (e) => {
        e.preventDefault();

        // Send product id and user password to backend to remove product from database
        axios.post('http://localhost:9000/admin/remove', popupInfo)
            .then(res => {
                // handle response
                // If remove was successful in backend, remove item from view
                if(res.data.success) {
                    setProducts(products.filter((item) => item.product_id !== popupInfo.prod_id));
                    setOpen(false);
                }
                console.log("Database result: " + res.data.dbResult);
                alert(res.data.message);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Admin Remove Product Listing Page</h1>
            <ul>
                {products.map((item, idx) => (
                    <Product key={idx} id={item.product_id} name={item.title} description={item.description} price={item.price} 
                    quantity={item.quantity} img={item.img_filename} openDialog={() => promptPassword(item.product_id)}/>
                ))}
            </ul>

            <Popup isOpen={isOpen} setOpen={setOpen}>
                <p>Are you sure you want to remove this product listing? Please enter your administrator password to confirm.</p>
                <form onSubmit={deleteItem}>
                    <label htmlFor="password">Password:*</label>
                    <input id="password" type="password" required="required" minLength="8" maxLength="20" 
                        onChange={e => setPopupInfo({ ...popupInfo, password: e.target.value })}></input>

                    <input type="submit" value="Confirm"></input>
                </form>
            </Popup>
        </div>
    );
}

export default AdminRemove;