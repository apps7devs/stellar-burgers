import React from 'react';
import { ProfileNavigationBar } from '../../components/profile-navigation-bar/profile-navigation-bar';
import { TProfilePage } from '../../utils/types';
import styles from './profile-page.module.scss';

const ProfilePage = ({ children, hint }:TProfilePage): React.JSX.Element => {

  return (
    <section className={styles.section}>
      <ProfileNavigationBar
        hint={hint}
      />
      {children}
    </section>
  )
}

export default ProfilePage;