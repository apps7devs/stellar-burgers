// сюда впихивается все содержание модалки через компонент Modal, а еще тут всякие хэндлеры для закрытия модалок
import React from "react";
import styles from './modal-overlay.module.scss'
import PropTypes from 'prop-types';

function ModalOverlay({ children, closeModal }) {

  const closeModelOvl = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const closeModelEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  React.useEffect(() => {
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