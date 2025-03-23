import {
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    SET_INGREDIENT_MODAL_VISIBLE
  } from '../../utils/commons';

  import { TInitialCurrentIngrState  } from '../../utils/types/reducers/reducers-types';
  import { TAllIngredientsTypes } from '../../utils/types/actions/commons-types';

export const initialCurrentIngrState: TInitialCurrentIngrState = {
    currentIngredient: undefined,
    ingredientModalVisibility: false
  }

  export const currentIngredientReducer = (state = initialCurrentIngrState, action:TAllIngredientsTypes) => {
    switch (action.type) {
      case SET_CURRENT_INGREDIENT: {
        return {
          ...state,
          currentIngredient: action.item
        }
      }
      case DELETE_CURRENT_INGREDIENT: {
        return {
          ...state,
          currentIngredient: ''
        }
      }
      case SET_INGREDIENT_MODAL_VISIBLE: {
        return {
          ...state,
          ingredientModalVisibility: true
        }
      }
      default: {
        return state;
      }
    }
  }