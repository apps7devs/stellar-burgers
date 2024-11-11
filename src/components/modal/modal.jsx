import ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalNode = document.getElementById('portal');

function Modal ({children, closeModal, title}) {

  return ReactDOM.createPortal (
    <ModalOverlay
      closeModal={closeModal}
    >
      <div className={styles.modalContainer}>
        <header className={`${styles.headerModal} ml-10 mr-10 mt-10`}>
          <button className={styles.close} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
          {title && <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>}
        </header>
        {children}
      </div>
    </ModalOverlay>,
    modalNode
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Modal;