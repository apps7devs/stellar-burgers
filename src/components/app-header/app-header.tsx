
import { NavLink, useMatch } from "react-router-dom";
import { useSelector } from '../../services/hooks';
import { TUserState } from '../../utils/types';
import styles from "./app-header.module.scss";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = (): React.JSX.Element => {
    const { user } = useSelector(
        (state): TUserState => state.user!
      );

    return (
        <header className={`${styles.header} pt-4 pb-4`} >
            <nav className={`${styles.header_nav} container `}>
                <section className={styles.left}>
                    <NavLink to='/' className={({ isActive }) => `${styles.nav_link} pt-4 pr-5 pb-4 ${isActive && styles.active}`}>
                        <BurgerIcon type="primary" />
                        <span className="text">Конструктор</span>
                    </NavLink>
                    <NavLink to='/feed' className={({ isActive }) => `${styles.nav_link} pt-4 pb-4 pl-5 ${isActive && styles.active}`}>
                        <ListIcon type="secondary" />
                        <span className=" text">Лента заказов</span>
                    </NavLink>
                </section>
                <section className={styles.logo}>
                    <a href="https://practicum.yandex.ru/react/"><Logo /></a>
                </section>
                <section className={styles.right}>
                    <NavLink to='/profile' className={({ isActive }) => `${styles.nav_link} ${styles.header_navitem_profile} pt-4 pb-4 pl-5 pr-5 ${isActive && styles.active} ${useMatch('/login' + '/*') ? styles.active : ''}`}>
                        <ProfileIcon type="secondary" />
                        <span className="text">{user?.name ? user.name : 'Личный кабинет'}</span>
                    </NavLink>
                </section>
            </nav>
        </header>
    );
}

export default AppHeader;