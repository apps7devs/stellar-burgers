import React, { ChangeEvent } from 'react';
import styles from './profile-personaldata.module.scss';
import { TUserState } from '../../utils/types';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks';

export const ProfilePersonalData= (): React.JSX.Element => {

  const { user } = useSelector(
    (state): TUserState => state.user!
  );

  const dispatch = useDispatch();
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [buttonsDisabled, setButtonsDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user.name) {
      resetForm();
    }
    // eslint-disable-next-line
  }, [user.name]);

  React.useEffect(() => {
    handleButtonsDisable()
    // eslint-disable-next-line
  }, [name, email])

  const resetForm = (): void => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <form className={styles.inputsForm} autoComplete="off" onSubmit={handleSubmit}>
      { /* @ts-ignore */}
      <Input
        type="text"
        icon="EditIcon"
        name="name"
        placeholder="Имя"
        value={name}
        onChange={handleNameChange}
      />
      { /* @ts-ignore */}
      <Input
        type="email"
        icon="EditIcon"
        name="email"
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
      />
      { /* @ts-ignore */}
      <Input
        type="text"
        icon="EditIcon"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className={styles.buttonsContainer}>
        {
          buttonsDisabled
            ?
            <></>
            :
            <>
              <Button htmlType="button" type="secondary" onClick={resetForm}  >Отмена</Button>
              <Button htmlType="submit" type="primary">Сохранить</Button>
            </>
        }
      </div>
    </form>
  )
}