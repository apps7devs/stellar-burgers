import { useEffect } from 'react';
import styles from './modal-overlay.module.scss'
import {TModalOverLay} from '../../../utils/types'

const ModalOverlay = ({ children, isModalVisible, closeModal }: TModalOverLay): React.JSX.Element => {

  const closeModelOvl = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const closeModalEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }  
  useEffect(() => {
    document.addEventListener('keydown', closeModalEsc)
    return  () => document.removeEventListener('keydown', closeModalEsc)
  }, [])

  return (
    <div className={`${styles.container} ${isModalVisible ? styles.containerActive : ''}`} onClick={(e)=>closeModelOvl(e)} data-testid="cy-close-modal-ovl">
      {children}
    </div>
  )
}

export default ModalOverlay;