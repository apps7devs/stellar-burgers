import { useEffect } from 'react';
import styles from './modal-overlay.module.scss'
import {TModalOverLay} from '../../../utils/types'

const ModalOverlay = ({ children, isModalVisible, closeModal }: TModalOverLay): React.JSX.Element => {

  const closeModelOvl = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const closeModelEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }  
  useEffect(() => {
    document.addEventListener('keydown', closeModelEsc)
    return  () => document.removeEventListener('keydown', closeModelEsc)
  }, [])

  return (
    <div className={`${styles.container} ${isModalVisible ? styles.containerActive : ''}`} onClick={closeModelOvl}>
      {children}
    </div>
  )
}

export default ModalOverlay;