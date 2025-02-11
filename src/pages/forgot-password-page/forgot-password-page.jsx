import React from 'react';
import styles from './forgot-password-page.module.scss';
import EnteringForm from '../../components/entering-form/entering-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, CLEAR_FORGOT_PASSWORD_STATE } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const history = useNavigate();
  const { forgot_password_success } = useSelector(
    state => state.user
  );

  React.useEffect(() => {
    if (forgot_password_success) {
      history.replace({pathname: '/reset-password', state: { forgotPassword: true}})
      dispatch({ type: CLEAR_FORGOT_PASSWORD_STATE })
    }
  }, [history, forgot_password_success, dispatch])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }

  if (getCookie('token')) {
    return (
      <Navigate to='/'/>
    )
  }

  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Восстановление пароля"
        buttonTitle="Восстановить"
        onSubmit={onSubmit}
      >
        <div className="mb-6">
          <Input
            type="email"
            name="email"
            size="default"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

      </EnteringForm>
    </section>
  )
}

export default ForgotPasswordPage;