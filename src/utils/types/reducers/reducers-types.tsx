import { TBaseIngredient, TConstructorIngredient } from "../../types";

export type TInitialAllIngredientsState = {
  errIngredients: boolean,
  loadIngredients: boolean,
  selectIngredient: TBaseIngredient | null,
  orderedIngridients: {}
  activeTab: string;
  ingredientsSort: []
}

export type TInitConstructorState = {
  bun: TConstructorIngredient | undefined;
  ingredients: TConstructorIngredient[] | undefined;
}

export type TInitialCurrentIngrState = {
  currentIngredient: TBaseIngredient | undefined;
  ingredientModalVisibility: boolean;
}

export type TInitialOrderState = {
  orderNumber: null | number;
  orderModalVisibility: Boolean;
  orderName: string
  orderRequestLoad: Boolean,
  orderRequestErr: Boolean,
  orderDetailsModal: Boolean,
}