import { 
  SET_INGREDIENTS,
  SET_ERR_INGREDIENTS,
  SET_LOAD_INGREDIENTS,
  SET_ACTIVE_TAB,
  SET_SELECT_INGRIDIENT,
  COUNTER_INCRM,
  COUNTER_DECRM,
  COUNTERS_RESET
  } from "../actions/ingredients";

  const init = {
    activeTab: 'buns',
    errIngredients: false,
    loadIngredients: true,
    selectIngredient: null,
    orderedIngridients: {}
  }

  export const ingredientsReducer = (store = init, action) => {
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
      case SET_SELECT_INGRIDIENT:
        return {
          ...store,
          selectIngredient: action.selectIngredient
      }
      case COUNTER_INCRM: {
        const refreshIngridients = [...store.ingredientsSort];

        const itemType = action.item.type;

        for(let cat of refreshIngridients){
          if(cat.itemType === itemType) {
            const currentItem = cat.catData.findIndex((item) => {
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

        for(let cat of refreshIngridients){
          if(cat.itemType === itemType) {
            const currentItem = cat.catData.findIndex((item) => {
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
        for(let cat of refreshIngridients){
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


  const ingridientsSortProcess = (rawData) => {

    return [
      {
        catName: 'Булки',
        catType: 'buns',
        itemType: 'bun',
        catData: rawData.filter((item)=> {
          return item.type === "bun"
        })
      },
      {
        catName: 'Соусы',
        catType: 'sauces',
        itemType: 'sauce',
        catData: rawData.filter((item)=> {
          return item.type === "sauce"
        })      
      },
      {
        catName: 'Начинки',
        catType: 'fillings',
        itemType: 'main',
        catData: rawData.filter((item)=> {
          return item.type === "main"
        })
      }
    ]
  }