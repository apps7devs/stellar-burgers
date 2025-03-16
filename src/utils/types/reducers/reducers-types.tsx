import { TBaseIngredient, TConstructorIngredient } from "../../types";

export type TInitialAllIngredientsState = {
  // ingredients: TBaseIngredient[] | [];
  // buns: TBaseIngredient[] | undefined;
  // sauces: TBaseIngredient[] | undefined;
  // mainIngredients: TBaseIngredient[] | undefined;
  // allIngredientsError: string | undefined;

  errIngredients: boolean,
  loadIngredients: boolean,
  selectIngredient: TBaseIngredient | null,
  orderedIngridients: {}
  activeTab: string;
  ingredientsSort: []
}



// activeTab: 'buns',
// errIngredients: false,
// loadIngredients: true,
// selectIngredient: null,
// orderedIngridients: {}

export type TInitConstructorState = {
  bun: TConstructorIngredient | undefined;
  ingredients: TConstructorIngredient[] | undefined;
}

// export type TInitialConstructorState = {
//   bun: TConstructorIngredient | undefined;
//   ingredients: TConstructorIngredient[] | undefined;
// }

export type TInitialCurrentIngrState = {
  currentIngredient: TBaseIngredient | undefined;
  ingredientModalVisibility: boolean;
}

export type TInitialOrderState = {
  orderNumber: null | number;
  ///orderError: string | undefined;
  orderModalVisibility: Boolean;
  orderName: string
  orderRequestLoad: Boolean,
    orderRequestErr: Boolean,
    orderDetailsModal: Boolean,
}