//import React from "react";
import styles from './ingredient-details.module.scss';
/*import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'*/
//import { itemPropTypes } from "../../../utils/PropTypes";
import { useSelector } from "react-redux";

function IngredientDetails () {
  const { selectIngredient } = useSelector(store=>store.ingredients
  );
  return (
    <article className={`${styles.ingredientCart}`}>
      <img alt={selectIngredient.name} src={selectIngredient.image_large} className={`${styles.image} pb-4`} />
      <h4 className={`${styles.name} text text_type_main-medium pb-8`}>{selectIngredient.name}</h4>
      <ul className={`${styles.details} text text_type_main-default text_color_inactive pb-15`}>
        <li><span>Калории,ккал</span><span className="text text_type_digits-default">{selectIngredient.calories}</span></li>
        <li><span>Белки, г</span><span className="text text_type_digits-default">{selectIngredient.proteins}</span></li>
        <li><span>Жиры, г</span><span className="text text_type_digits-default">{selectIngredient.fat}</span></li>
        <li><span>Углеводы, г</span><span className="text text_type_digits-default">{selectIngredient.carbohydrates}</span></li>
      </ul>
    </article>
  )
}

/*IngredientDetails.propTypes = {
  item: itemPropTypes.isRequired
}*/

export default IngredientDetails;