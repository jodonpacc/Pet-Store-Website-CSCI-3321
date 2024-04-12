import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';

function EditProduct() {
    axios.defaults.withCredentials = true;

    const { id } = useParams();
    // Updated after API call for product info. If product with given id doesn't exist, page won't display.
    const [productExists, setProductExists] = useState(false);

    // Keeps track of the current/original values of the product being edited (populated with object returned by database in useEffect)
    const [currentValues, setCurrentValues] = useState({});

    // Keeps track of the values the user has entered in the Edit fields
    const [editValues, setEditValues] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        password: '',
        image: undefined
    });

    function updateCurrentValues() {
        axios.post('http://localhost:9000/product', { prod_id: id })
            .then(res => {
                if(res.data.product_id) {
                    setCurrentValues(res.data);
                    setProductExists(true);
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }

    // Populates the currentValues state (and thus the inputs on page) with original values of the product
    useEffect(() => {
        updateCurrentValues();
    }, []);

    // Handles dialog box that prompts for administrator password
    const [isOpen, setOpen] = useState(false);
    const openDialog = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const editListing = (e) => {
        e.preventDefault();

        // Create FormData object that contains all the form entries
        // (have to use FormData here in order to send the image file information correctly)
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", editValues.title);
        formData.append("description", editValues.description);
        formData.append("price", editValues.price);
        formData.append("quantity", editValues.quantity);
        formData.append("password", editValues.password);
        formData.append("image", editValues.image);

        // Send form data to backend to edit this product listing
        axios.post('http://localhost:9000/admin/edit', formData)
            .then(res => {
                // handle response
                if(res.data.success) {
                    setOpen(false);
                    updateCurrentValues();
                }
                console.log("Database result: " + res.data.dbResult);
                alert(res.data.message);
            })
            .catch(err => console.log(err));
    }

    return (productExists) ? (
        <div>
            <h1>Editing Product ID: {id}</h1>
            <p>Leave a field blank to retain its original value.</p>
            {/* Fields to keep track of - Title, Description, Price, Quantity, Image filename. */}
            <form onSubmit={openDialog}>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" minLength="5" maxLength="50"
                    onChange={e => setEditValues({ ...editValues, title: e.target.value })}></input>

                <label htmlFor="description">Description:</label>
                <input id="description" type="text" minLength="5" maxLength="500"
                    onChange={e => setEditValues({ ...editValues, description: e.target.value })}></input>

                <label htmlFor="price">Price:</label>
                <input id="price" type="number" step="0.01" min="0" minLength="5" maxLength="50"
                    onChange={e => setEditValues({ ...editValues, price: e.target.value })}></input>

                <label htmlFor="quantity">Quantity:</label>
                <input id="quantity" type="number" min="0" minLength="5" maxLength="50"
                    onChange={e => setEditValues({ ...editValues, quantity: e.target.value })}></input>

                <label htmlFor="image">New Image:</label>
                <input id="image" type="file" accept="image/png, image/jpeg"
                    onChange={e => setEditValues({ ...editValues, image: e.target.files[0] })}></input>

                <input type="submit" value="Submit"></input>
            </form>

            <h1>Current Values</h1>
            <div>
                <p>Title: {currentValues.title}</p>
                <p>Description: {currentValues.description}</p>
                <p>Price: {currentValues.price}</p>
                <p>Quantity: {currentValues.quantity}</p>
                <label htmlFor="current-image">Original Image:</label>
                <img id="current-image" src={'/assets/images/' + currentValues.img_filename} alt={"Current image of the " + currentValues.title + " product."} 
                    width="100" height="100"></img>
                {currentValues.removed && <div>THIS PRODUCT HAS BEEN REMOVED</div>}
            </div>

            <Popup isOpen={isOpen} setOpen={setOpen}>
                <p>Are you sure you want to update this product listing with these values? Please enter your administrator password to confirm.</p>
                <form onSubmit={editListing}>
                    <label htmlFor="password">Password:*</label>
                    <input id="password" type="password" required="required" minLength="8" maxLength="20" 
                        onChange={e => setEditValues({ ...editValues, password: e.target.value })}></input>

                    <input type="submit" value="Confirm"></input>
                </form>
            </Popup>
        </div>
    ) : <p>No product with this product ID ({id}) exists.</p>;
}

export default EditProduct;