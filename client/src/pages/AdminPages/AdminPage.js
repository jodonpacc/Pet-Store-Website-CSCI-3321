function AdminPage() {
    const gotoAdminPage = (page) => {
        window.location.href = "/admin/" + page;
    };

    return (
        <div>
            <h1>Admin Landing Page</h1>
            <ul>
                <li><button onClick={() => gotoAdminPage("add")}>Add Page</button></li>
                <li><button onClick={() => gotoAdminPage("remove")}>Remove Page</button></li>
                <li><button onClick={() => gotoAdminPage("edit")}>Edit Page</button></li>
            </ul>
        </div>
    );
}

export default AdminPage;