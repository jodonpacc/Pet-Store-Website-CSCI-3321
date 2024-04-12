import { React, useState, useEffect } from 'react';
import axios from 'axios';
import AdminProduct from '../../../components/AdminProduct';

function AdminEdit() {
    axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);

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

    // Function that opens the EditProduct page for a specific product (given its product id)
    const editProduct = (id) => {
        window.location.href = "/admin/edit/" + id;
    }

    return (
        <div>
            <h1>Admin Edit Product Listing Page</h1>
            <ul>
                {products.map((item, idx) => (
                    <AdminProduct key={idx} id={item.product_id} name={item.title} description={item.description} price={item.price} 
                    quantity={item.quantity} img={item.img_filename} removed={item.removed} buttonFunction={() => editProduct(item.product_id)} buttonName="Edit"/>
                ))}
            </ul>
        </div>
    );
}

export default AdminEdit;