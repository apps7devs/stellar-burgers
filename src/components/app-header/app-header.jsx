import styles from "./app-header.module.scss";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`} >
            <nav className={`${styles.header_nav} container `}>
                <section className={styles.left}>
                    <a href="#constructor" className={`${styles.nav_link} pt-4 pr-5 pb-4`}>
                        <BurgerIcon type="primary" />
                        <span className="text">Конструктор</span>
                    </a>
                    <a href="#orders" className={`${styles.nav_link} pt-4 pb-4 pl-5`}>
                        <ListIcon type="secondary" />
                        <span className=" text">Лента заказов</span>
                    </a>
                </section>
                <section className={styles.logo}>
                    <a href="https://practicum.yandex.ru/react/"><Logo /></a>
                </section>
                <section className={styles.right}>
                    <a href="#profile" className={`${styles.nav_link} ${styles.header_navitem_profile} pt-4 pb-4 pl-5 pr-5 `}>
                        <ProfileIcon type="secondary" />
                        <span className="text">Личный кабинет</span>
                    </a>
                </section>
            </nav>
        </header>        
    );
}

export default AppHeader;