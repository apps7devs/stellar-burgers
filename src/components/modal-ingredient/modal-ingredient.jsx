// модалка с инфой про ингредиент
import React from 'react';
import styles from './modal-ingredient.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SET_INGREDIENT_MODAL_VISIBLE } from '../../services/actions/current-ingredient';

import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'

function ModalIngredient() {
  const dispatch = useDispatch();
  const { ingredientId } = useParams();

  const { currentIngredient } = useSelector(
    state => state.currentIngredient
  );
  const { ingredients } = useSelector(
    state => state.allIngredients
  );

  const item = currentIngredient ?
    currentIngredient
    :
    ingredients.filter(ingredient => ingredient._id === ingredientId)[0]
    ;

  React.useEffect(
    () => {
      if (ingredientId !== '') {
        dispatch({
          type: SET_INGREDIENT_MODAL_VISIBLE
        })
      }
    }, [])

  return (
    <>
      {
        item !== undefined &&
        <div className={styles.container}>
          <IngredientDetails item={item}></IngredientDetails>
        </div>
      }
    </>
  )
}

export default ModalIngredient;