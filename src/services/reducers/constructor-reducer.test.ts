import {
    SET_ITEM,
    REMOVE_ITEM,
    SEQUENCE_ELEMENTS,
    SET_BUN,
    CLEAR_INGREDIENTS } from '../../utils/commons'

import * as actions from '../actions/ingredients';
import * as actionsOrder from '../actions/order';

import { TAllIngredientsTypes } from '../../utils/types/actions/commons-types';
import {init, constructorReducer} from './constructor-reducer'

import { TBaseIngredient  } from '../../utils/types';

describe('constructor-reducer', () => {
    it('should return the initial state of constructor-reducer state', () => {
      expect(constructorReducer(undefined, {} as TAllIngredientsTypes)).toEqual(init)
    });

    it("should handle SET_ITEM", () => {
      const expectedAction = {
        type: SET_ITEM,
        item: ingredientsData[0]
      }
      expect(actions.setItemAction(ingredientsData[0])).toEqual(expectedAction);
    });

    it("should handle REMOVE_ITEM", () => {
      const expectedAction = {
        type: REMOVE_ITEM,
        item: ingredientsData[0]
      }
      expect(actions.deleteItemAction(ingredientsData[0])).toEqual(expectedAction);
    });

    it("should handle SEQUENCE_ELEMENTS", () => {
        const expectedAction = {
          type: SEQUENCE_ELEMENTS,
          ingredients: ingredientsData
      }
      expect(actions.sequenceElementsAction(ingredientsData)).toEqual(expectedAction);
    });

    it("should handle SET_BUN", () => {
      const expectedAction = {
        type: SET_BUN,
        item: ingredientsData[0]
      }
      expect(actions.setBunAction(ingredientsData[0])).toEqual(expectedAction);
    });
    
    it("should handle CLEAR_INGREDIENTS", () => {
      const expectedAction = {
        type: CLEAR_INGREDIENTS,
      }
      expect(actionsOrder.clearIngredientsAction()).toEqual(expectedAction);
    });
})

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