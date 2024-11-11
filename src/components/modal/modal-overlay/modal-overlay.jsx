import { useEffect } from 'react';
import styles from './modal-overlay.module.scss'
import PropTypes from 'prop-types';

function ModalOverlay({ children, closeModal }) {

  const closeModelOvl = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  useEffect(() => {
    const closeModelEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeModelEsc)
    return  () => document.removeEventListener('keydown', closeModelEsc)
  }, [])

  return (
    <div className={`${styles.overlay}`} onClick={closeModelOvl}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;