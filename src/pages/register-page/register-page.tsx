import React, {ChangeEvent, FormEvent } from 'react';
import styles from './register-page.module.scss';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLEAR_REGISTRATION_STATE } from '../../services/actions/user';
import EnteringForm from '../../components/entering-form/entering-form';

const RegisterPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { register_success, registerError } = useSelector(
    state => state.user
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const clearState = () => {
    setEmail('');
    setName('');
    setPassword('');
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    dispatch(register(name, email, password));
    clearState();
  }

  React.useEffect(() => {
    if (register_success) {
      //navigate.replace({pathname: '/login'})
      navigate('/login', {replace: true})
      dispatch({ type: CLEAR_REGISTRATION_STATE })
    }
  }, [navigate, register_success])

  return (
    <section className={styles.section}>
      <EnteringForm
        formTitle="Регистрация"
        buttonTitle="Зарегистрироваться"
        onSubmit={onSubmit}
      >
        <Input
          type="text"
          name="name"
          size="default"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <div className="mt-6 mb-6">
          <Input
            type="email"
            name="email"
            size="default"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mt-6 mb-6">
          <Input
            type="password"
            name="password"
            size="default"
            icon="ShowIcon"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </EnteringForm>
      <p className={styles.error}>{registerError && registerError}</p>
    </section>
  )
}

export default RegisterPage;