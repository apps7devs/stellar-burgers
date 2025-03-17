import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from "react-router-dom";
import { TUserState } from '../../utils/types';

interface IProtectedProps {
    onlyUnAuth?: boolean
    component: React.JSX.Element
    children?: React.JSX.Element
  }

const Protected = ({
    onlyUnAuth = false,
    component,
  }: IProtectedProps): React.JSX.Element => {
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
    
        return component
    }
    
export const OnlyAuth = Protected
export const OnlyUnAuth = ({
  component,
}: {
  component: React.JSX.Element
}): React.JSX.Element => <Protected onlyUnAuth={true} component={component} />