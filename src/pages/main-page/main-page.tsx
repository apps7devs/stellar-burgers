import styles from './main-page.module.scss';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from '../../services/hooks';

import { TBaseIngredient, TOrderState } from '../../utils/types';
import {setCurrentIngredientAction, setIngredientModalVisibleAction} from '../../services/actions/ingredients'

import { placeOrder } from '../../services/actions/order';

const MainPage = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { orderError } = useSelector(
    (state):TOrderState => state.placeOrder!
  );

  const handleOpenIngredientModal = (currentIngredient: TBaseIngredient) => {
    dispatch(setCurrentIngredientAction(currentIngredient))
    dispatch(setIngredientModalVisibleAction())
  }

  const handleOpenOrderModal = (info: string[]) => {
    dispatch(placeOrder(info, orderError))
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
    </>
  );
}

export default MainPage;