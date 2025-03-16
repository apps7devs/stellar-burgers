import React, {ChangeEvent, FormEvent} from 'react';
import styles from './forgot-password-page.module.scss';
import EnteringForm from '../../components/entering-form/entering-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { TUserState } from '../../utils/types';
import { forgotPassword, clearForgotPasswordStateAction } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

const ForgotPasswordPage = (): React.JSX.Element => {
  const [email, setEmail] = React.useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgot_password_success } = useSelector(
    (state):TUserState => state.user!
  );

  React.useEffect(() => {
    if (forgot_password_success) {
      navigate('/reset-password', { state:{forgotPassword:true}, replace: true})
      dispatch(clearForgotPasswordStateAction())
    }
  }, [navigate, forgot_password_success, dispatch])

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>):void => {
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
          { /* @ts-ignore */}
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