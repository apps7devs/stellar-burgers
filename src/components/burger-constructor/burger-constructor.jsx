import {useState} from "react";
import styles from './burger-constructor.module.scss';
import BurgerConstructorItem from "./order-item/order-item";
//import { order } from "../../utils/orderMock";
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from "../../utils/PropTypes";

import Modal from '../../components/modal/modal';
import OrderDetails from './order-details/order-details';

function BurgerConstructor ({ ingredients, order }) {

  const [orderDetails, setOrderDetails] = useState(false)

  return(
    <section className={`${styles.section} mt-25 ml-10`}>
      <BurgerConstructorItem
        item={ingredients[0]}
        isTop={true}
        isBottom={false}
        isLocked={true}
      />
      
      <div className={styles.orderWrapper}>
        <ul className={styles.order}>
          {order.map((item, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <BurgerConstructorItem item={item} />
              </li>
            )
          })}
        </ul>
      </div>
      
      <BurgerConstructorItem
        item={ingredients[0]}
        isTop={false}
        isBottom={true}
        isLocked={true}
      />

      <div className={`${styles.summary} mt-10 mr-4 mt-10`}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button type="primary" size="large" htmlType="button" onClick={()=>{setOrderDetails(true)}}>
          Оформить заказ
        </Button>
      </div>
      {
        orderDetails && (
          <Modal
            title=""
            closeModal={()=>{setOrderDetails(false)}}
            ><OrderDetails/>
          </Modal>
        )
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  //ingredients: ingredientsPropTypes,
  order: ingredientsPropTypes
}

export default BurgerConstructor;