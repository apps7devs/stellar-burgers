import { 
    SET_INGREDIENTS,
    SET_ERR_INGREDIENTS,
    SET_LOAD_INGREDIENTS,
    SET_ACTIVE_TAB,
    COUNTER_INCRM,
    COUNTER_DECRM,
    COUNTERS_RESET
  } from '../../utils/commons';

import * as actions from '../actions/ingredients';
import * as actionsOrder from '../actions/order';

import { TAllIngredientsTypes } from '../../utils/types/actions/commons-types';
import {init, ingredientsReducer} from './ingredients-reducer'

import { TBaseIngredient  } from '../../utils/types';

describe('ingridients-reducer', () => {
    it('should return the initial state of ingridients-reducer state', () => {
      expect(ingredientsReducer(undefined, {} as TAllIngredientsTypes)).toEqual(init)
    });

    it("should handle SET_INGREDIENTS", () => {
      const expectedAction = {
        type: SET_INGREDIENTS,
        ingredients: ingredientsData
      }
      expect(actions.setIngredientsAction(ingredientsData)).toEqual(expectedAction);
    });

    it("should handle SET_ERR_INGREDIENTS", () => {
      const expectedAction = {
        type: SET_ERR_INGREDIENTS,
        errIngredients: true
      }
      expect(actions.setErrIngredientsAction()).toEqual(expectedAction);
    });

    it("should handle SET_LOAD_INGREDIENTS", () => {
        const expectedAction = {
          type: SET_LOAD_INGREDIENTS,
          loadIngredients: false
      }
      expect(actions.setLoadIngredientsAction()).toEqual(expectedAction);
    });

    it("should handle SET_ACTIVE_TAB", () => {
      const expectedAction = {
        type: SET_ACTIVE_TAB,
        activeTab: 'activeTabString'
      }
      expect(actions.setCurrentTabAction('activeTabString')).toEqual(expectedAction);
    });
    
    it("should handle COUNTER_INCRM", () => {
      const expectedAction = {
        type: COUNTER_INCRM,
        item: ingredientsData[0]
      }
      expect(actions.counterIncrmAction(ingredientsData[0])).toEqual(expectedAction);
    });

    it("should handle COUNTER_DECRM", () => {
        const expectedAction = {
          type: COUNTER_DECRM,
          item: ingredientsData[0],
          ingredientsSort: ingredientsData[0]
        }
        expect(actions.counterDecrmAction(ingredientsData[0])).toEqual(expectedAction);
      });

      it("should handle COUNTERS_RESET", () => {
        const expectedAction = {
          type: COUNTERS_RESET,
        }
        expect(actionsOrder.clearCountersAction()).toEqual(expectedAction);
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