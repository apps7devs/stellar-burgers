import { 
  SET_INGREDIENTS,
  SET_ERR_INGREDIENTS,
  SET_LOAD_INGREDIENTS,
  SET_ACTIVE_TAB,
  COUNTER_INCRM,
  COUNTER_DECRM,
  COUNTERS_RESET
} from '../../utils/commons';
import {TBaseIngredient} from '../../utils/types'

import {TCatType} from '../../utils/types'


import { TAllIngredientsTypes } from '../../utils/types/actions/commons-types';
import {
  TInitialAllIngredientsState,
} from '../../utils/types/reducers/reducers-types';

  const init:TInitialAllIngredientsState = {
    activeTab: 'buns',
    errIngredients: false,
    loadIngredients: true,
    selectIngredient: null,
    orderedIngridients: {},
    ingredientsSort: []
  }

  export const ingredientsReducer = (store = init, action: TAllIngredientsTypes) => {
    switch (action.type) {
      case SET_INGREDIENTS: {
        return {
          ...store,
          ingredientsSort: ingridientsSortProcess(action.ingredients),
          ingredients: action.ingredients
        }
      }
      case SET_ERR_INGREDIENTS: {
        return {
          ...store,
          errIngredients: action.errIngredients
        }
      }
      case SET_LOAD_INGREDIENTS: {
        return {
          ...store,
          loadIngredients: action.loadIngredients
        }
      }
      case SET_ACTIVE_TAB: {
        return {
          ...store,
          activeTab: action.activeTab
        }
      }
      case COUNTER_INCRM: {
        const refreshIngridients = [...store.ingredientsSort];

        const itemType = action.item.type;
        let cat:TCatType = {catName: '', catType: '', itemType: '', catData: []}
        for(cat of refreshIngridients){
          if(cat.itemType === itemType) {
            const currentItem = cat.catData.findIndex((item:TBaseIngredient) => {
              return item._id === action.item._id
            })
            if(itemType === 'bun'){
              cat.catData.map((bun) => { return bun.count = 0 });//clear
              cat.catData[currentItem]['count'] = 2;
            } else {
              if(cat.catData[currentItem]['count']) {
                cat.catData[currentItem]['count'] += 1;
              } else cat.catData[currentItem]['count'] = 1;
            }
          }
        }
        return {
          ...store,
          ingredientsSort: refreshIngridients
        }
      }
      case COUNTER_DECRM: {
        const refreshIngridients = [...store.ingredientsSort];

        const itemType = action.item.type;

        let cat:TCatType = {catName: '', catType: '', itemType: '', catData: []}
        for(cat of refreshIngridients){
          if(cat.itemType === itemType) {
            const currentItem = cat.catData.findIndex((item:TBaseIngredient) => {
              return item._id === action.item._id
            })
            if(itemType === 'bun'){
              cat.catData[currentItem]['count'] = 0;
            } else {
              if(cat.catData[currentItem]['count']) {
                cat.catData[currentItem]['count'] -= 1;
              } else cat.catData[currentItem]['count'] = 0;
            }
          }
        }
        return {
          ...store,
          ingredientsSort: refreshIngridients
        }
      }
      case COUNTERS_RESET: {
        const refreshIngridients = [...store.ingredientsSort]
        let cat:TCatType = {catName: '', catType: '', itemType: '', catData: []}
        for(cat of refreshIngridients) {
          cat.catData.map((item) => { return item.count = 0 })
        }
        return {
          ...store,
          ingredientsSort: refreshIngridients
        }
      }
      default: {
        return store;
      }
    }
  }

  const ingridientsSortProcess = (unsorted:TBaseIngredient[]) => {
    const buns:TCatType = {
      catName: 'Булки',
      catType: 'buns',
      itemType: 'bun',
      catData: unsorted.filter((item:TBaseIngredient)=> {
        return item.type === "bun"
      })
    }
    const sauces:TCatType = {
      catName: 'Соусы',
      catType: 'sauces',
      itemType: 'sauce',
      catData: unsorted.filter((item:TBaseIngredient)=> {
        return item.type === "sauce"
      })
    }
    const fillings:TCatType =  {
      catName: 'Начинки',
      catType: 'fillings',
      itemType: 'main',
      catData: unsorted.filter((item:TBaseIngredient)=> {
        return item.type === "main"
      })
    }

    return [ buns, sauces, fillings ]
  }