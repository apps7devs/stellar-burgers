import styles from './not-found-page.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.header}>
        404
      </h1>
      <Link to="/" className={styles.link}>Вернуться на главную</Link>
    </section>
  )
}