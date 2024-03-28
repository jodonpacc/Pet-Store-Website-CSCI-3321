// Contains helper functions that display a dialog box prompting for the user's password, then authenticates and returns success: true/false as parameter of callback
import axios from 'axios';

function authenticateUser(callback) {
    // Show dialog box prompting for password

    // Send username and password to authenticate user
    axios.post('http://localhost:9000/account/authenticate')
        .then(res => {
            callback(res.data);
        })
        .catch(err => console.log(err));
}