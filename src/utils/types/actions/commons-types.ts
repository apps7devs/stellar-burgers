import {
    SET_INGREDIENTS,
    SET_LOAD_INGREDIENTS,
    SET_ERR_INGREDIENTS,
    COUNTERS_RESET,
    /*SET_BUNS,
    SET_SAUCES,
    SET_MAIN_INGREDIENTS,*/
    SET_ITEM,
    COUNTER_INCRM,
    COUNTER_DECRM,
    SET_BUN,
    SEQUENCE_ELEMENTS,
    REMOVE_ITEM,
    SET_ACTIVE_TAB,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    SET_INGREDIENT_MODAL_VISIBLE,
    SET_INGREDIENT_MODAL_INVISIBLE,
  } from '../../commons';
  
  import { IClearCounters, IClearIngredients } from './order-types';
  
  import { TBaseIngredient, TConstructorIngredient } from '../../types';
  
  //ingredients
  export interface IGetAllItems {
    readonly type: typeof SET_INGREDIENTS;
    readonly ingredients: TBaseIngredient[];
  }

  export interface ISetLoadIngredients {
    readonly type: typeof SET_LOAD_INGREDIENTS;
    readonly loadIngredients: boolean;
  }

  export interface IErrIngredients {
    readonly type: typeof SET_ERR_INGREDIENTS
    readonly errIngredients: boolean
  }

  export interface ICounterIncrm {
    readonly type: typeof COUNTER_INCRM;
    readonly item: TBaseIngredient;
  };
  
  export interface ICounterDecrm {
    readonly type: typeof COUNTER_DECRM;
    readonly item: TBaseIngredient;
    readonly ingredientsSort: TBaseIngredient;
  };
  
  export interface ISetActiveTab {
    readonly type: typeof SET_ACTIVE_TAB;
    readonly activeTab: string;
  };


  //constructor
    export interface ISetItem {
      readonly type: typeof SET_ITEM;
      readonly item: TBaseIngredient;
    }
    
      export interface IRemoveItem {
      readonly type: typeof REMOVE_ITEM;
      readonly item: TConstructorIngredient;
    };
  
      export interface ISequenceElements {
      readonly type: typeof SEQUENCE_ELEMENTS;
      readonly ingredients: TConstructorIngredient[];
    };

    export interface ISetBun {
      readonly type: typeof SET_BUN;
      readonly item: TBaseIngredient;
    };

  
  
  /*export interface ISetMainIngredients {
    readonly type: typeof SET_MAIN_INGREDIENTS;
    readonly ingredients: TBaseIngredient[];
  }
  
  export interface ISetBuns {
    readonly type: typeof SET_BUNS;
    readonly ingredients: TBaseIngredient[];
  }
  
  export interface ISetSauces {
    readonly type: typeof SET_SAUCES;
    readonly ingredients: TBaseIngredient[];
  }*/
  
  // export interface IGetItemsFailed {
  //   readonly type: typeof SET_ERR_INGREDIENTS;
  //   readonly errIngredients: Promise<Error>;
  // }
  
  /*export interface IAddItem {
    readonly type: typeof SET_ITEM;
    readonly item: TBaseIngredient;
  }*/
  

  

  
  // export interface IDragArray {
  //   readonly type: typeof SEQUENCE_ELEMENTS;
  //   readonly ingredients: TConstructorIngredient[];
  // };
  
  
  export interface IDeleteItem {
    readonly type: typeof REMOVE_ITEM;
    readonly item: TConstructorIngredient;
  };
  
  
  export interface ISetCurrentIngredient{
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly item: TBaseIngredient;
  };

  export interface IDeleteCurrentIngredient {
    readonly type: typeof DELETE_CURRENT_INGREDIENT;
  };

  export interface ISetIngredientModalVisible {
    readonly type: typeof SET_INGREDIENT_MODAL_VISIBLE;
  };

  export interface ISetIngredientModalInvisible {
    readonly type: typeof SET_INGREDIENT_MODAL_INVISIBLE;
  };
  
  export type TAllIngredientsTypes =
    | IGetAllItems
    | ISetLoadIngredients
    | IErrIngredients
    | ISetActiveTab
    | ICounterIncrm
    | ICounterDecrm
    // | ISetMainIngredients
    // | ISetBuns
    // | ISetSauces
    // | IGetItemsFailed
   // | IAddItem
    // | IDragArray
    | IDeleteItem
    // | ISetCurrentTab
    | IClearCounters
    | ISetItem
    | IRemoveItem
    | ISetBun
    | ISequenceElements
    | IClearIngredients
    | ISetCurrentIngredient
    | IDeleteCurrentIngredient
    | ISetIngredientModalVisible
    | ISetIngredientModalInvisible