import styles from './loader.module.scss'

import {TExtClass} from '../../utils/types'

const Loader = ({extraClass}:TExtClass) => {

  return (
    <div className={`${styles.wrapper} ${extraClass}`}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader;