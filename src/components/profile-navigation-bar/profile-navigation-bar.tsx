import { NavLink } from 'react-router-dom';
import styles from './profile-navigation-bar.module.scss';
import { deleteUser, clearSessionTerminationStateAction } from '../../services/actions/user';
import { useDispatch } from '../../services/hooks';
import { TProfileNavigationBar } from '../../utils/types';



export const ProfileNavigationBar = ({ hint }:TProfileNavigationBar): React.JSX.Element => {


  const handleExit = () => {
    dispatch(deleteUser());
    dispatch(clearSessionTerminationStateAction())
  }

  const dispatch = useDispatch();
  return (
    <nav className={styles.navBar}>
      <NavLink to="/profile" className={({ isActive }) => `${styles.navLink} ${isActive && styles.active}`} end>
        Профиль
      </NavLink>

      <NavLink to="/profile/orders"className={({ isActive }) => `${styles.navLink} ${isActive && styles.active}`} end >
        История заказов
      </NavLink>

      <NavLink to="/login" className={styles.navLink} onClick={handleExit}>
        Выход
      </NavLink>

      <p className={`text_type_main-default text_color_inactive mt-20 ${styles.hint}`}>
        {hint}
      </p>
    </nav>
  )
}