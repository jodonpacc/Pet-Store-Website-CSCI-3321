import axios from 'axios';

function AdminRemove() {
    axios.defaults.withCredentials = true;

    return (
        <div>
            <h1>Admin Remove Product Listing Page</h1>
        </div>
    );
}

export default AdminRemove;