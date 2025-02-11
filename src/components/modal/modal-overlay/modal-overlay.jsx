import { useEffect } from 'react';
import styles from './modal-overlay.module.scss'
import PropTypes from 'prop-types';

function ModalOverlay({ children, isModalVisible, closeModal }) {

  const closeModelOvl = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const closeModelEsc = (e) => {
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

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  isModalVisible: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;