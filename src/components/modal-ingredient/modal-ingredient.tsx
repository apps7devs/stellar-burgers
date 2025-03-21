import React from 'react';
import styles from './modal-ingredient.module.scss';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { SET_INGREDIENT_MODAL_VISIBLE } from '../../utils/commons';
import { TCurrentIngredientState, TAllIngredientsState } from '../../utils/types';


import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'

const ModalIngredient = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { ingredientId } = useParams();

  const { currentIngredient } = useSelector(
    (state): TCurrentIngredientState => state.currentIngredient!
  );
  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients!
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