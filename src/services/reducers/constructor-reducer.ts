import {
    SET_ITEM,
    REMOVE_ITEM,
    SEQUENCE_ELEMENTS,
    SET_BUN,
    CLEAR_INGREDIENTS
  } from '../../utils/commons';

  import { TAllIngredientsTypes } from '../../utils/types/actions/commons-types';

  import {
    TInitConstructorState
  } from '../../utils/types/reducers/reducers-types';

  const init:TInitConstructorState = {
    bun: undefined,
    ingredients: []
  }

  export const constructorReducer = (store = init, action:TAllIngredientsTypes) => {
    switch (action.type) {
      case SET_ITEM: {
        const newItem = { ...action.item }
        return {
          ...store,
          ingredients: [...store.ingredients!, newItem]
        }
      }
      case REMOVE_ITEM: {
        const modifiedState = { ...store };
        const item = store.ingredients!.filter(item => item.uid === action.item.uid);
        const itemIndex = store.ingredients!.indexOf(item[0]);
        if (itemIndex !== -1) {
          modifiedState.ingredients!.splice(itemIndex, 1);
          return {
            ...store,
            ingredients: [...modifiedState.ingredients!]
          }
        }
        else {
          return store;
        }
      }
      case SEQUENCE_ELEMENTS: {
        return {
          ...store,
          ingredients: [...action.ingredients]
        }
      }
      case SET_BUN: {
        return {
          ...store,
          bun: action.item
        }
      }
      case CLEAR_INGREDIENTS: {
        return {
          ...store,
          bun: '',
          ingredients: []
        }
      }
      default: {
        return store;
      }
    }
  }