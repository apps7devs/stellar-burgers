import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT, SET_INGREDIENT_MODAL_VISIBLE } from '../../utils/commons'

import * as actions from '../actions/ingredients';

import { TAllIngredientsTypes  } from '../../utils/types/actions/commons-types';
import { TBaseIngredient  } from '../../utils/types';

import {initialCurrentIngrState, currentIngredientReducer} from './current-ingredient-reducer'

const ingredientsData:TBaseIngredient[] = [
    {
      _id: '60d3b41abdacab0026a733c6',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
      count: 0
    },
    {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
      count: 0
    }
  ];

describe('current-ingredient reducer', () => {
    it('should return the initial state of current-ingredient-reducer state', () => {
        expect(currentIngredientReducer(undefined, {} as TAllIngredientsTypes)).toEqual(initialCurrentIngrState)
      });

    it("should handle SET_CURRENT_INGREDIENT", () => {
        const expectedAction = {
          type: SET_CURRENT_INGREDIENT,
          item: ingredientsData[0]
        }
        expect(actions.setCurrentIngredientAction(ingredientsData[0])).toEqual(expectedAction);
      });

      it("should handle DELETE_CURRENT_INGREDIENT", () => {
        const expectedAction = {
          type: DELETE_CURRENT_INGREDIENT
        }
        expect(actions.deleteCurrentIngredientAction()).toEqual(expectedAction);
      });

      it("should handle SET_INGREDIENT_MODAL_VISIBLE", () => {
        const expectedAction = {
          type: SET_INGREDIENT_MODAL_VISIBLE,
        }
        expect(actions.setIngredientModalVisibleAction()).toEqual(expectedAction);
      });
})