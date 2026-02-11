import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1>404</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Go back home</Link>
        </>
    );
};

export default NotFound;