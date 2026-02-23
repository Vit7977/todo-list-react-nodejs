import { Navigate } from "react-router-dom";

function PublicRoute({ isAuth, children }) {
    if (isAuth) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default PublicRoute;