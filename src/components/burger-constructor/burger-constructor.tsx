import {useMemo} from "react";
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './burger-constructor.module.scss';
import BurgerConstructorItem from "./order-item/order-item";
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import {TBurgerConstructorItem, TConstructorIngredient, TBurgerIngredients, TUserState, TBurgerConstructorState} from '../../utils/types'

import {TInitialOrderState} from '../../utils/types/reducers/reducers-types'

import {setItemAction, counterIncrmAction, sequenceElementsAction, setBunAction} from '../../services/actions/ingredients'
import { v4 as generateUid } from 'uuid';

import Loader from '../loader/loader';

import { useNavigate } from 'react-router-dom';


const BurgerConstructor = ({ openModal }: TBurgerIngredients): React.JSX.Element => {
  const { isLoggedIn } = useSelector(
    (store): TUserState => store.user!
  );

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(
    (store): TBurgerConstructorState => store.constructorOrder!
  );

  //dropPlace works
  const [{ canDrop }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TBurgerConstructorItem) {
      onDropHandler(item);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    })
  });
  
  const onDropHandler = (ingredient: TBurgerConstructorItem) => {
    const { item } = ingredient;
    if (!item.uid) {
      if (item.type !== 'bun') {
        const refreshIngredient = { ...item }
        refreshIngredient.uid = generateUid();
        dispatch(setItemAction(refreshIngredient))
        dispatch(counterIncrmAction(item))
      } else {
        dispatch(setBunAction(item))
        dispatch(counterIncrmAction(item))
      }
    }
  }

  //change el`s order
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = ingredients[dragIndex];
    if (draggedItem) {
      const refreshIngredients = [...ingredients];
      refreshIngredients.splice(dragIndex, 1);
      refreshIngredients.splice(hoverIndex, 0, draggedItem);
      dispatch(sequenceElementsAction(refreshIngredients))
    } else {
      return
    }
  };
  

  const costTotal = useMemo(() => {
    if (ingredients && bun) {
      const costIngridients = ingredients && ingredients?.reduce((prevPrice: number, item:TConstructorIngredient) => prevPrice + item.price, 0)
      const costTotal = costIngridients + bun.price * 2;
      return costTotal
    } else {
      return 0
    }
 }, [ingredients, bun])


  const {orderRequestLoad} = useSelector((store):TInitialOrderState=>store.placeOrder!);
  
  const placeOrderRun = () => {
    const bodyOrder: string[] = [bun._id, ...ingredients.map((item:TConstructorIngredient) => item._id), bun._id];

    if (isLoggedIn) {
      ingredients && openModal(bodyOrder)
    } else {
      navigate('/login', {replace: true})
    }
  }

  return(
    <section className={`${styles.section} mt-15 ml-10 `}>
      <div className={`pt-10 pb-10 ${styles.dropPlace} ${canDrop && styles.dropPlaceActive}`} ref={dropTarget}>
      {
        (!bun && !ingredients.length ) && (
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
            moveItem={moveItem}
          />
        )
      }
      <div className={styles.orderWrapper}>
        <ul className={styles.order}>
          {ingredients && ingredients.map((item:TConstructorIngredient, index:number) => {
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
            moveItem={moveItem}
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
    </section>
  )
}

export default BurgerConstructor;