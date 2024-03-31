// Contains helper function(s) for getting session info from backend
import axios from 'axios';

// Handle the return value in a callback
// Returns an object with fields (valid, username, is_admin)
export function getUserInfo(callback) {
    axios.get('http://localhost:9000/account')
        .then(res => {
            // Server sends back username and is_admin from session info
            callback(res.data);
        })
        .catch(err => console.log(err));
};