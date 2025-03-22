// Общий компонент для всех модалок
import React from "react";
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalNode = document.getElementById('portal');

import {TModal} from '../../utils/types'

const Modal = ({children, title, isModalVisible, closeModal}: TModal): React.JSX.Element => {
    
  return ReactDOM.createPortal (
    <ModalOverlay
      closeModal={closeModal}
      isModalVisible={isModalVisible}
    >
      <div className={styles.modalContainer}>
        <header className={`${styles.headerModal} ml-10 mr-10 mt-10`}>
          <button className={styles.close} onClick={closeModal} data-testid="cy-close-modal-button">
            <CloseIcon type="primary" />
          </button>
          {title && <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>}
        </header>
        {children}
      </div>
    </ModalOverlay>,
    modalNode!
  )
}

export default Modal;