import {useMemo} from "react";
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-constructor.module.scss';
import BurgerConstructorItem from "./order-item/order-item";
//import { order } from "../../utils/orderMock";
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
//import { ingredientsPropTypes } from "../../utils/PropTypes";

import Modal from '../../components/modal/modal';
import OrderDetails from './order-details/order-details';

import { SET_ITEM, SEQUENCE_ELEMENTS, SET_BUN, CLEAR_INGREDIENTS } from '../../services/actions/constructor';
import { ORDER_DETAILS_MODAL, ORDER_DETAILS_RESET, placeOrder } from '../../services/actions/order';
import { COUNTER_INCRM, COUNTERS_RESET } from '../../services/actions/ingredients';
import { v4 as generateUid } from 'uuid';


import Loader from '../loader/loader';

function BurgerConstructor () {

  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(
    store => store.constructorOrder
  );

  //dropPlace works
  const [{ canDrop }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    })
  });
  
  function onDropHandler(ingredient)  {
    const { item } = ingredient;
    if (!item.uid) {
      if (item.type !== 'bun') {
        const refreshIngredient = { ...item }
        refreshIngredient.uid = generateUid();
        dispatch({
          type: SET_ITEM,
          item: refreshIngredient
        })
        dispatch({
          type: COUNTER_INCRM,
          item: item
        })
      } else {
        dispatch({
          type: SET_BUN,
          item: item
        })
        dispatch({
          type: COUNTER_INCRM,
          item: item
        })
      }
    }
  }

  //change el`s order
  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = ingredients[dragIndex];
    if (draggedItem) {
      const refreshIngredients = [...ingredients];
      refreshIngredients.splice(dragIndex, 1);
      refreshIngredients.splice(hoverIndex, 0, draggedItem);
      dispatch({
        type: SEQUENCE_ELEMENTS,
        ingredients: refreshIngredients
      })
    } else {
      return
    }
  };
  

  const costTotal = useMemo(() => {
    if (ingredients && bun) {
      const costIngridients = ingredients && ingredients?.reduce((prevPrice, item) => prevPrice + item.price, 0)
      const costTotal = costIngridients + bun.price * 2;
      return costTotal
    } else {
      return 0
    }
 }, [ingredients, bun])

  //const [orderDetails, setOrderDetails] = useState(false)

  const {orderDetailsModal, orderRequestLoad} = useSelector(store=>store.placeOrder);
  const setOrderDetailsModal = (show)=>{
    dispatch({
      type: ORDER_DETAILS_MODAL,
      show: show
    })
    dispatch({ type: COUNTERS_RESET })
    dispatch({ type: CLEAR_INGREDIENTS })
    dispatch({ type: ORDER_DETAILS_RESET })
  }
  
  const placeOrderRun = () => {
    const bodyOrder = [bun._id, ...ingredients.map(item => item._id), bun._id];
    dispatch(placeOrder(bodyOrder))
  }

  return(
    <section className={`${styles.section} mt-15 ml-10 `}>
      <div className={`pt-10 pb-10 ${styles.dropPlace} ${canDrop && styles.dropPlaceActive}`} ref={dropTarget}>
      {
        (!bun && !ingredients.lenght>0) && (
          <p className='ml-10 text text_type_main-medium text_color_inactive'>Перетащите ингредиенты сюда</p>
        )
      }
      {
        bun && (
          <BurgerConstructorItem
            item={bun}
            isTop={true}
            isBottom={false}
            isLocked={true}
          />
        )
      }
      <div className={styles.orderWrapper}>
        <ul className={styles.order}>
          {ingredients && ingredients.map((item, index) => {
            return (
              <li key={item.uid} className={styles.listItem}>
                <BurgerConstructorItem item={item} index={index} moveItem={moveItem}
                 />
              </li>
            )
          })}
        </ul>
      </div>
      
      {
        bun && (
          <BurgerConstructorItem
            item={bun}
            isTop={false}
            isBottom={true}
            isLocked={true}
          />
        )
      }
      </div>

      <div className={`${styles.summary} mr-4 mt-10 pb-10`}>
        {orderRequestLoad && (
          <Loader extraClass={styles.loader} />
        )}
        <p className="text text_type_digits-medium mr-2">{costTotal}</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button type="primary" size="large" htmlType="button" onClick={placeOrderRun} disabled={!costTotal}>
          Оформить заказ
        </Button>
      </div>
      {
        orderDetailsModal && (
          <Modal
            title=""
            closeModal={()=>{setOrderDetailsModal(false)}}
            ><OrderDetails/>
          </Modal>
        )
      }
    </section>
  )
}

/*BurgerConstructor.propTypes = {
  ingredients: ingredientsPropTypes,
  order: ingredientsPropTypes
}*/

export default BurgerConstructor;