//import React from "react";
import styles from './ingridient-cart.module.scss';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { itemPropTypes } from "../../../utils/PropTypes";

import { useDrag } from "react-dnd";

function IngredientCart ({ item }) {

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { item },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <article className={`${styles.ingredientCart} ${isDrag && styles.cartOnDrag}`} ref={dragRef}>
      <img alt={item.name} src={item.image} className={styles.image} />
      <div className={`${styles.cost} mt-1 mb-1`}>
        <h4 className="text text_type_digits-small mr-2">{item.price}</h4>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.details} text text_type_main-default pb-6`}>{item.name}</p>
      <Counter count={item.count} size="default" />
    </article>
  )
}

IngredientCart.propTypes = {
  item: itemPropTypes.isRequired
}

export default IngredientCart;