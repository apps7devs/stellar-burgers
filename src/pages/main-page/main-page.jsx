import styles from './main-page.module.scss';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import ModalOrder from '../../components/modal-order/modal-order';
//ИМПОРТЫ ДЛЯ DnD___________________________________________________________________________________
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//ИМПОРТЫ ДЛЯ РЕДАКСА___________________________________________________________________________________
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_VISIBLE,
} from '../../services/actions/current-ingredient';

import {  CLEAR_INGREDIENTS } from '../../services/actions/constructor';
import { COUNTERS_RESET } from '../../services/actions/ingredients';

import {
  ORDER_DETAILS_RESET,
  SET_ORDER_MODAL_INVISIBLE,
  placeOrder
} from '../../services/actions/order';

function MainPage() {
  const dispatch = useDispatch();

  const { orderNumber, orderError, orderModalVisibility } = useSelector(
    state => state.placeOrder
  );

  const handleOpenIngredientModal = (currentIngredient) => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      item: currentIngredient
    })
    dispatch({
      type: SET_INGREDIENT_MODAL_VISIBLE,
    })
  }

  const handleOpenOrderModal = (info) => {
    dispatch(placeOrder(info, orderError))
  }

  const handleCloseOrderModal = () => {
    dispatch({
      type: SET_ORDER_MODAL_INVISIBLE
    })
    dispatch({ type: COUNTERS_RESET })
    dispatch({ type: CLEAR_INGREDIENTS })
    dispatch({
      type: ORDER_DETAILS_RESET
    })
  }

  return (
    <>
    
      <div className={styles.sectionContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            openModal={handleOpenIngredientModal}
          />
          <BurgerConstructor
            openModal={handleOpenOrderModal}
          />
        </DndProvider>
      </div>

      

      <Modal
        isModalVisible={orderModalVisibility}
        closeModal={handleCloseOrderModal}
      >
        <ModalOrder
          orderNumber={orderNumber}
        />
      </Modal>

    </>
  );
}

export default MainPage;