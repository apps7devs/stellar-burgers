import React from "react";
import styles from './ingridient-cart.module.scss';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { itemPropTypes } from "../../../utils/PropTypes";

function IngredientCart ({ item }) {
  return (
    <article className={`${styles.ingredientCart}`}>
      <img alt={item.name} src={item.image} className={styles.image}></img>
      <div className={`${styles.cost} mt-1 mb-1`}>
        <h4 className="text text_type_digits-small mr-2">{item.price}</h4>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.details} text text_type_main-default pb-6`}>{item.name}</p>
      <Counter count={1} size="default" />
    </article>
  )
}

IngredientCart.propTypes = {
  item: itemPropTypes.isRequired
}

export default IngredientCart;