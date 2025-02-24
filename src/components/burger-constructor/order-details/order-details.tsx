import React from "react";
import styles from './order-details.module.scss';
import successIco from '../../../images/success.svg'

import {TModalOrder} from '../../../utils/types'

const OrderProcess = ({orderNumber}: TModalOrder): React.JSX.Element => {

  return (
    <article className={`${styles.ingredientCart}`}>
      <h4 className={`${styles.num} text text_type_digits-large pb-8`}>{orderNumber}</h4>
      <p className="text_type_main-medium pb-15">идентификатор заказа</p>
      <img src={successIco} className={`${styles.statusIco} pb-15`}/>
      <p className="text text_type_main-small mb-1">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-1 pb-30">Дождитесь готовности на орбитальной станции</p>
    </article>
  )
}

export default OrderProcess;