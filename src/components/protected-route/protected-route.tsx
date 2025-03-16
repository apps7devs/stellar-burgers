import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from "react-router-dom";
import { TUserState } from '../../utils/types';

interface IProtectedProps {
    onlyUnAuth?: boolean
    children: React.JSX.Element
  }

const ProtectedRoute = ({ onlyUnAuth = false, children}: IProtectedProps): React.JSX.Element => {
    const location = useLocation();
    const {isLoggedIn} = useSelector((store):TUserState => store.user!);

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