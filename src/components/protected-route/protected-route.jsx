import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component}) => {
  const { isLoggedIn, loggingIn } = useSelector(store => store.user);
    const location = useLocation();
    if(!loggingIn){
      if(isLoggedIn){
        return component
      } else {
        return (
          <Navigate to='/login' state={{ from: location.pathname }} />
        )
      }
    } else {
      return (
        <Navigate to='/login' state={{ from: location }} />
      )
    }
}

export default ProtectedRoute;