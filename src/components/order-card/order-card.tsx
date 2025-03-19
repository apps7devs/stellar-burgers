import { useMemo } from 'react';
import styles from './order-card.module.scss';
import { useSelector, useDispatch } from '../../services/hooks';
import { TAllIngredientsState } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as generateUid } from 'uuid';
import { dateCalc } from '../../utils/date-calc';
import { TOrderCard } from '../../utils/types';

import { getCurrentFeedIdAction, setFeedModalVisibilityAction } from '../../services/actions/ws-actions';

export const OrderCard = ({ order, isPersonalOrders }: TOrderCard): React.JSX.Element => {

  const dispatch = useDispatch();

  const slicedIdArray = order.ingredients.length < 5 ? order.ingredients : order.ingredients.slice(0, 5);

  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients!
  );

  const currentOrderHandler = (id: string): void => {
    dispatch(setFeedModalVisibilityAction(true));
    dispatch(getCurrentFeedIdAction(id));
  }

  const localizedStatus: string =
    order.status === "done"
      ? "Выполнен"
      : order.status === "pending"
        ? "Готовится"
        : order.status === "created"
          ? "Создан"
          : "";

  const totalPrice = useMemo(() => {
    let total = 0;
    order.ingredients.map((el: string) => {
      const orderedItems = ingredients.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [order.ingredients, ingredients]);


  const sliceHandler =
    order.ingredients &&
      order.ingredients.slice(5).length !== 0
      ?
      order.ingredients.slice(5).length
      :
      null

  return (
    <div className={styles.cardContainer} onClick={() => { currentOrderHandler(order._id) }}>
      <div className={`${isPersonalOrders ? styles.cardLarge : styles.cardSmall} ${styles.card}`}>
        <div className={`${styles.orderNumberContainer} mb-6`}>
          <p className={`${styles.orderNumber} text text_type_digits-default`}>#{order.number}</p>
          <p className={`${styles.createdAt} text text_type_main-default text_color_inactive`}>{dateCalc(order.createdAt)}</p>
        </div>
        <p className={`${styles.name} text text_type_main-medium`}>{order.name}</p>
        {
          isPersonalOrders
            ?
            <p className={`${styles.status} text text_type_main-small mt-2`}>{localizedStatus}</p>
            :
            null
        }
        <div className={`${styles.ingredients} mt-7`}>
          <ul className={styles.ingredientsContainer}>
            {
              slicedIdArray && ingredients &&
              slicedIdArray.map((item: string) => {
                const current = ingredients.find(ingredient => ingredient._id === item)
                return (
                  <li className={styles.item} key={generateUid()}>
                    <img className={styles.image} src={current && current!.image_mobile} alt={current && current!.name} />
                  </li>
                )
              })
            }
            {sliceHandler &&
              <div className={`${styles.moreIngredients} text text_type_digits-default`}>
                <span>+{sliceHandler}</span>
              </div>

            }
          </ul>
          <div className={styles.currencyContainer}>
            <p className="text text_type_digits-default">
              {totalPrice}
            </p>
            <div className={`${styles.currency} ml-2`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
