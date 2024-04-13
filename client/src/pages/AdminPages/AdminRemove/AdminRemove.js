import { React, useState, useEffect } from 'react';
import NavigationBar from "../../../components/NavigationBar";
import axios from 'axios';
import AdminProduct from '../../../components/AdminProduct';
import Popup from '../../../components/Popup';

function AdminRemove() {
    axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [popupInfo, setPopupInfo] = useState({
        prod_id: 0,
        password: '',
        removing: false
    });

    // Populates the products list with all products in the database
    useEffect(() => {
        axios.get('http://localhost:9000/product/allProducts')
            .then(res => {
                if(Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const promptPassword = (id, removed) => {
        setOpen(true);
        setPopupInfo({ prod_id: id, password: '', removing: !removed });
    }

    // Deletes an item from database and view (if user is authenticated successfully).
    // Called after administrator clicks confirm button on password prompt popup.
    // popupInfo has required info about which product (id) is being changed, the given password, and whether it is removing/readding the product
    const deleteItem = (e) => {
        e.preventDefault();

        // Send product id and user password to backend to remove product from database
        axios.post('http://localhost:9000/admin/remove', popupInfo)
            .then(res => {
                // handle response
                // If remove was successful in backend, update the item to show removed
                if(res.data.success) {
                    setProducts(products.map((item) => {
                        if(item.product_id === popupInfo.prod_id) {
                            item.removed = popupInfo.removing;
                        }
                        return item;
                    }));
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
            <h1>Admin Remove/Readd Product Listing Page</h1>
            <ul>
                {products.map((item, idx) => (
                    <AdminProduct key={idx} id={item.product_id} name={item.title} description={item.description} price={item.price} 
                    quantity={item.quantity} img={item.img_filename} removed={item.removed} buttonFunction={() => promptPassword(item.product_id, item.removed)} 
                    buttonName={item.removed ? "Readd" : "Remove"}/>
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