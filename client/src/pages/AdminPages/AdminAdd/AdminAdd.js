import { React, useState } from 'react';
import NavigationBar from "../../../components/NavigationBar";
import axios from 'axios';
import Popup from '../../../components/Popup';
import './AdminAdd.css'

function AdminAdd() {
    axios.defaults.withCredentials = true;

    // Keeps track of the values the user has entered in the Add fields
    const [addValues, setAddValues] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        password: '',
        image: undefined
    });
    
    // Handles dialog box that prompts for administrator password
    const [isOpen, setOpen] = useState(false);
    const openDialog = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const addListing = (e) => {
        e.preventDefault();

        // Create FormData object that contains all the form entries
        // (have to use FormData here in order to send the image file information correctly)
        const formData = new FormData();
        formData.append("title", addValues.title);
        formData.append("description", addValues.description);
        formData.append("price", addValues.price);
        formData.append("quantity", addValues.quantity);
        formData.append("password", addValues.password);
        formData.append("image", addValues.image);

        // Send form data to backend to add a new product listing
        axios.post('http://localhost:9000/admin/add', formData)
            .then(res => {
                // handle response
                if(res.data.success) {
                    setOpen(false);
                }
                console.log("Database result: " + res.data.dbResult);
                alert(res.data.message);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <NavigationBar/>
            <h1 id="add-page-title">Admin Add Product Listing Page</h1>
            {/* Fields to keep track of - Title, Description, Price, Quantity, Image filename. Rating defaults to 0 so is left out */}
            <form id="add-form" onSubmit={openDialog}>
                <label htmlFor="title">Title:*</label>
                <input id="title" type="text" required="required" minLength="5" maxLength="50" 
                    onChange={e => setAddValues({ ...addValues, title: e.target.value })}></input>

                <label htmlFor="description">Description:*</label>
                <textarea id="description" type="text" required="required" minLength="5" maxLength="500" 
                    onChange={e => setAddValues({ ...addValues, description: e.target.value })}></textarea>

                <label htmlFor="price">Price:*</label>
                <input id="price" type="number" step="0.01" min="0" required="required" minLength="5" maxLength="50" 
                    onChange={e => setAddValues({ ...addValues, price: e.target.value })}></input>

                <label htmlFor="quantity">Quantity:*</label>
                <input id="quantity" type="number" min="0" required="required" minLength="5" maxLength="50" 
                    onChange={e => setAddValues({ ...addValues, quantity: e.target.value })}></input>

                <label htmlFor="image">Image:</label>
                <input id="image" type="file" accept="image/png, image/jpeg"
                    onChange={e => setAddValues({ ...addValues, image: e.target.files[0] })}></input>

                <input id="add-submit" type="submit" value="Submit"></input>
            </form>

            <Popup isOpen={isOpen} setOpen={setOpen}>
                <p>Are you sure you want to add this product listing? Please enter your administrator password to confirm.</p>
                <form onSubmit={addListing}>
                    <label htmlFor="password">Password:*</label>
                    <input id="password" type="password" required="required" minLength="8" maxLength="20" 
                        onChange={e => setAddValues({ ...addValues, password: e.target.value })}></input>

                    <input type="submit" value="Confirm"></input>
                </form>
            </Popup>
        </div>
    );
}

export default AdminAdd;