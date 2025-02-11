import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyUnAuth = false, children}) => {
    const location = useLocation();
    const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

    if (onlyUnAuth && isLoggedIn) {
        const fromPage = location.state?.from || '/';

        return <Navigate to={fromPage} />
    }

    if (!onlyUnAuth && !isLoggedIn) {
        return (
            <Navigate to='/login' state={{ from: location.pathname }} />
        )
    }

    return children
}

export default ProtectedRoute;