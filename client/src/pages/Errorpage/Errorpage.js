import { useRouteError } from "react-router-dom";
import axios from 'axios'

function ErrorPage() {
    // This line must be present on every main page so that session information is circulated properly
    axios.defaults.withCredentials = true;
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;