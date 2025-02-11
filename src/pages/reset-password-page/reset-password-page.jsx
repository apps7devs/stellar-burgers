import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword, CLEAR_RESET_PASSWORD_STATE } from '../../services/actions/user';
import styles from './reset-password-page.module.scss';
import EnteringForm from '../../components/entering-form/entering-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';


const ResetPasswordPage = () => {

  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const dispatch = useDispatch();
  const history = useNavigate();
  const { reset_password_success } = useSelector(
    state => state.user
  );

  React.useEffect(() => {
    if (reset_password_success) {
      history.replace({ pathname: '/login' })
      dispatch({ type: CLEAR_RESET_PASSWORD_STATE })
    }
  }, [history, reset_password_success, dispatch])

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  }

  React.useEffect(() => {
    if (history?.location?.pathname === '/reset-password' && !history?.location?.state?.forgotPassword) {
      history.replace({pathname: '/login'})
    }
  }, [history.location.pathname])


  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Восстановление пароля"
        buttonTitle="Восстановить"
        onSubmit={onSubmit}
      >
        <div className="mb-6">
          <Input
            type="password"
            name="password"
            size="default"
            icon="ShowIcon"
            placeholder="Введите новый пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mt-6 mb-6">
          <Input
            type="text"
            name="text"
            size="default"
            placeholder="Введите код из письма"
            value={token}
            onChange={handleTokenChange}
          />
        </div>
      </EnteringForm>
    </section>
  )
}

export default ResetPasswordPage;