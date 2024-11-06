import React from "react";
import styles from './ingredient-details.module.scss';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { itemPropTypes } from "../../../utils/PropTypes";

function IngredientDetails ({ item }) {
  return (
    <article className={`${styles.ingredientCart}`}>
      <img alt={item.name} src={item.image_large} className={`${styles.image} pb-4`}></img>
      <h4 className={`${styles.name} text text_type_main-medium pb-8`}>{item.name}</h4>
      <ul className={`${styles.details} text text_type_main-default text_color_inactive pb-15`}>
        <li><span>Калории,ккал</span><span className="text text_type_digits-default">{item.calories}</span></li>
        <li><span>Белки, г</span><span className="text text_type_digits-default">{item.proteins}</span></li>
        <li><span>Жиры, г</span><span className="text text_type_digits-default">{item.fat}</span></li>
        <li><span>Углеводы, г</span><span className="text text_type_digits-default">{item.carbohydrates}</span></li>
      </ul>
     
    </article>
  )
}

IngredientDetails.propTypes = {
  item: itemPropTypes.isRequired
}

export default IngredientDetails;