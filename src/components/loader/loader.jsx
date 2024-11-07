// сюда впихивается все содержание модалки через компонент Modal, а еще тут всякие хэндлеры для закрытия модалок
import React from "react";
import styles from './loader.module.scss'

function Loader() {

  return (
    <div className={`${styles.wrapper} pt-10 pb-10`}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader;