import axios from 'axios';
import NavigationBar from "../../components/NavigationBar";
import AddIcon from "../../assets/images/plusIcon.png"
import RemoveIcon from "../../assets/images/minusIcon.png"
import EditIcon from "../../assets/images/gearIcon.png"
import './AdminPage.css';

function AdminPage() {
    axios.defaults.withCredentials = true;

    const gotoAdminPage = (page) => {
        window.location.href = "/admin/" + page;
    };

    return (
        <div>
            <NavigationBar/>
            <h1 id="admin-page-title">Admin Landing Page</h1>
            <div id="admin-functions">
                <div id="admin-function-group">
                    <img id="admin-function-icon" src={AddIcon} alt="Add Icon"/>
                    <button id="add-page-button" onClick={() => gotoAdminPage("add")}>Add Page</button>
                </div>
                <div id="admin-function-group">
                    <img id="admin-function-icon" src={RemoveIcon} alt="Remove Icon"/>
                    <button id="remove-page-button" onClick={() => gotoAdminPage("remove")}>Remove/ReAdd Page</button>                
                </div>
                <div id="admin-function-group">
                    <img id="admin-function-icon" src={EditIcon} alt="Edit Icon"/>
                    <button id="edit-page-button" onClick={() => gotoAdminPage("edit")}>Edit Page</button>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;