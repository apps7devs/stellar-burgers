import React, {ChangeEvent, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/user';
import styles from './profile-page.module.scss';
import { deleteUser } from '../../services/actions/user';
import { CLEAR_SESSION_TERMINATION_STATE } from '../../services/actions/user';

const ProfilePage = (): React.JSX.Element => {
  const { user } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false);

  React.useEffect(() => {
    if (user.name) {
      resetForm();
    }
  }, [user.name]);

  React.useEffect(() => {
    handleButtonsDisable()
  }, [name, email])

  // Приведение инпутов к дефолтному значению, т.е. к актуальным имени и адресу. Пароль для красоты.
  const resetForm = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const userData: { name?: string; email?: string; } = {}
    setButtonsDisabled(true);
    if (name !== user.name) {
      userData.name = name;
    }
    if (email !== user.email) {
      userData.email = email;
    }
    dispatch(updateUser(userData));
  }

  const handleButtonsDisable = () => {
    if (name !== user.name || email !== user.email) {
      setButtonsDisabled(false);
    } else {
      setButtonsDisabled(true);
    }
  }

  const handleExit = () => {
    dispatch(deleteUser());
    dispatch({
      type: CLEAR_SESSION_TERMINATION_STATE,
    })
  }

  return (
    <section className={styles.section}>
      <nav className={styles.navBar}>
        <NavLink to="/profile" className={({ isActive }) =>
                `${styles.navLink} ${isActive && styles.navLinkActive}`
              } >
          Профиль
        </NavLink>

        <NavLink to="/profile/orders" className={({ isActive }) =>
                `${styles.navLink} ${isActive && styles.navLinkActive}`
              } >
          История заказов
        </NavLink>

        <NavLink to="/login" className={styles.navLink}  onClick={handleExit}>
          Выход
        </NavLink>

        <p className={`text_type_main-default text_color_inactive mt-20 ${styles.hint}`}>
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </nav>
      <form className={styles.inputsForm} autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="text"
          icon="EditIcon"
          name="name"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
          autoComplete="off"
        />
        <Input
          type="email"
          icon="EditIcon"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <Input
          type="text"
          icon="EditIcon"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        
        <div className={styles.buttonsContainer}>
          {
            buttonsDisabled
              ?
              <></>
              :
              <>
                <Button  onClick={resetForm} type="secondary" htmlType="button" >Отмена</Button>
                <Button  type="primary" htmlType="submit" >Сохранить</Button>
              </>
          }
        </div>
      </form>
    </section>
  )
}

export default ProfilePage;