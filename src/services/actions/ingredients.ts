import {api as apiUrl, fetchStatus} from '../../utils/commons'
import {TBaseIngredient, TConstructorIngredient} from '../../utils/types'
import { AppDispatch, AppThunk } from '../../utils/types';

import { 
  SET_INGREDIENTS,
  SET_ERR_INGREDIENTS,
  SET_LOAD_INGREDIENTS,
  SET_ACTIVE_TAB,
  // //SET_SELECT_INGRIDIENT,
  COUNTER_INCRM,
  COUNTER_DECRM,
  // COUNTERS_RESET,
  SET_BUN,
  SEQUENCE_ELEMENTS,
  SET_ITEM,
  REMOVE_ITEM,
  SET_CURRENT_INGREDIENT,
  SET_INGREDIENT_MODAL_VISIBLE,
  DELETE_CURRENT_INGREDIENT
} from '../../utils/commons';

import { ISetCurrentIngredient, ISetIngredientModalVisible, IDeleteCurrentIngredient, IDeleteItem, ICounterIncrm, ICounterDecrm, ISetItem, ISequenceElements, ISetBun, ISetActiveTab } from '../../utils/types/actions/commons-types';

import {IGetAllItems} from '../../utils/types/actions/commons-types';

export const setIngredientsAction = (data:TBaseIngredient[]): IGetAllItems => ({
  type: SET_INGREDIENTS,
  ingredients: data
})
export const setErrIngredientsAction = ()=>({
  type: SET_ERR_INGREDIENTS,
  errIngredients: true
})
export const setLoadIngredientsAction = ()=>({
  type: SET_LOAD_INGREDIENTS,
  loadIngredients: false
})

export const setCurrentIngredientAction = (data: TBaseIngredient): ISetCurrentIngredient => ({
  type: SET_CURRENT_INGREDIENT,
  item: data
});

export const setIngredientModalVisibleAction = (): ISetIngredientModalVisible => ({
  type: SET_INGREDIENT_MODAL_VISIBLE,
});

export const deleteCurrentIngredientAction = (): IDeleteCurrentIngredient => ({
  type: DELETE_CURRENT_INGREDIENT,
});

export const deleteItemAction = (data: TConstructorIngredient): IDeleteItem => ({
  type: REMOVE_ITEM,
  item: data
});

export const counterDecrmAction = (data: TBaseIngredient): ICounterDecrm => ({
  type: COUNTER_DECRM,
  item: data,
  ingredientsSort: data
});

export const counterIncrmAction = (data: TBaseIngredient): ICounterIncrm => ({
  type: COUNTER_INCRM,
  item: data
});

export const setItemAction = (data: TBaseIngredient): ISetItem => ({
  type: SET_ITEM,
  item: data
});

export const sequenceElementsAction = (data: TConstructorIngredient[]): ISequenceElements => ({
  type: SEQUENCE_ELEMENTS,
  ingredients: data
});

export const setBunAction = (data: TBaseIngredient): ISetBun => ({
  type: SET_BUN,
  item: data
});

export const setCurrentTabAction = (data: string): ISetActiveTab => ({
  type: SET_ACTIVE_TAB,
  activeTab: data
});



export function getIngredients() {
  return function (dispatch:AppDispatch) {
    fetch(`${apiUrl}/ingredients`)
      .then(res => fetchStatus(res))
      .then(({ success, data }) => {
        if (success) return data
        return Promise.reject(`err :: ${data}`)
      })
      .then(data => {
        dispatch(setIngredientsAction(data))
      })
      .catch(err => {
        console.log('err :: ', err.message)
        dispatch(setErrIngredientsAction())
        
      })
      .finally(() => {
        setTimeout(() => {
            dispatch(setLoadIngredientsAction())
        }, 1000);//сервер предоставляющий api "слишком" шустрый =), лоадера не видно
      })
  }
}