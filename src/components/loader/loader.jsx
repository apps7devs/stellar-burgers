import styles from './loader.module.scss'

function Loader({extraClass}) {

  return (
    <div className={`${styles.wrapper} ${extraClass}`}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader;