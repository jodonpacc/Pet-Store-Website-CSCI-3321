import { React, useState, useEffect } from 'react';
import axios from 'axios';

function AuditTrail({id}) {
    /* A list that holds the entries of the audit trail
    Each entry has the following fields {
        change_id:
        type:
        change_time:
        user_name: 
        product_id:
    }
    */
    const [entries, setEntries] = useState([]);

    // Populates the entries list with all admin changes associated with the given product
    useEffect(() => {
        axios.post('http://localhost:9000/admin/audit', { productID: id })
            .then(res => {
                if(Array.isArray(res.data)) {
                    setEntries(res.data);
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Admin Audit Trail for Product ID {id}</h1>
            <ul>
                {entries.map((item) => (
                    <li>
                        <div>Action Type: {item.type}</div>
                        <div>Time of Change: {item.change_time}</div>
                        <div>Admin User: {item.user_name}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AuditTrail;