import {FormEvent} from 'react'

import { store } from '../services/store';

import { TAllIngredientsTypes } from '../utils/types/actions/commons-types';
export type TApplicationActions = | TAllIngredientsTypes | TOrderTypes | TUserTypes | TWSTypes;
import { TOrderTypes } from './types/actions/order-types';
import { TUserTypes } from './types/actions/user-types';
import { TWSTypes } from './types/actions/ws-types';

import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TAllIngredientsState = {
  ingredients: TBaseIngredient[];
  ingredientsSort: TBaseIngredient[];
  buns: TBaseIngredient[];
  sauces: TBaseIngredient[];
  mainIngredients: TBaseIngredient[];
  allIngredientsError: string;
  activeTab: string;
}

export type TCurrentIngredientState = {
    currentIngredient: TBaseIngredient;
    ingredientModalVisibility: boolean;
  }

  export type TBaseIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    count: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
    readonly __v: number;
    readonly _id: string;
  }

  export type TCatType = {
    catName: string
    catType: string
    itemType: string
    catData: TBaseIngredient[]
  }
  
  export type TCurrentIngredient = {
    item: TBaseIngredient
  }

  export type TUserState = {
    user: {
      email: string;
      name: string;
    }
    isLoggedIn: boolean;
    loggingIn: boolean;
    registerError: string;
    loginError: string;
    forgotPassowrdError: string;
    resetPassowrdError: string;
    authError: string;
    updateError: string;
    deleteUserError: string;
    register_success: boolean;
    login_success: boolean;
    forgot_password_success: boolean;
    reset_password_success: boolean;
    delete_user_success: boolean;
  }

  export type TOrderState = {
    orderNumber: number;
    orderError: string;
    orderModalVisibility: boolean;
    placeOrder?: undefined
  }

export type TIngredientsQtyItem = {
  item: string;
  amount: number;
}
export type TIngredientsQtyData = TIngredientsQtyItem[];

export type TProfileNavigationBar = {
  readonly hint: string
}

export type TScoreBoard = {
  readonly data: TResponseData;
}

export type TBurgerIngredients = {
  openModal: (currentIngredient: string[]) => void;
}

export type TIngredientsItem = TBurgerIngredients & {
  item: TBaseIngredient;
  counter?: number;
}

  export type TConstructorIngredient = TBaseIngredient & {
    uid?: string;
    index?: number | undefined;
  }

  export type TBurgerConstructorState = {
    bun: TConstructorIngredient;
    ingredients: TConstructorIngredient[];
  }

  export type TBurgerConstructorItem = {
    item: TConstructorIngredient;
    index?: number | undefined;
    isTop?: boolean;
    isBottom?: boolean;
    isLocked?: boolean;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
  }

export type TApiResponse = Response & {
    readonly refreshToken?: string;
    readonly accessToken?: string;
    readonly success?: boolean;
    readonly message?: string;
    readonly user?: TUserState;
    readonly order?: TOrderResponse;
  }

  type TOrderResponse = {
    success: boolean;
    name: string;
    order: {
      number: number;
    }
  }

  export type TRefreshFetch = (url: string, options: TApiOptions) => Promise<any>
  
  export type TApiOptions =  {
    readonly method?: 'PATCH' | 'POST' | 'GET';
    headers?: TResponseHeaders;
    readonly body?: BodyInit | null | undefined;
  }

  export type TResponseHeaders = {
    Accept?: string;
    'Content-Type': string;
    authorization?: string;
  }


  export type TModalOrder = {
    orderNumber: number;
  }

  export type TModalOrderCard = {
    readonly item: TConstructorIngredient | undefined;
    readonly amount: number;
    readonly currency: number;
  }
  
  export type TModalOrderInfo = {
    readonly isPage: boolean;
  }
  
  export type TOrderCard = {
    readonly order: TResponseOrderItem;
    readonly isPersonalOrders?: boolean;
  }
  
  export type TOrderFeed = {
    readonly data: TResponseOrderItem[];
    readonly pathname: string;
    readonly isFeed: boolean;
  }


  export type TBurgerIngredientCart = {
    openModal: (TOpenModal:TBaseIngredient)=>void;
    item: TBaseIngredient
  }

  export type TEnteringForm = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    formTitle: string;
    buttonTitle: string;
    children: React.ReactNode;
  }

  export type TExtClass = {
    extraClass:string
  }

  export type TModalOverLay = {
    children: React.ReactNode;
    isModalVisible: boolean;
    closeModal: ()=>void
  }

  export type TOpenModal = {
    openModal: (currentIngredient: TBaseIngredient) => void;
  }

  export type TModal = {
    children: React.ReactNode;
    isModalVisible: boolean;
    title: string;
    closeModal: ()=>void
  }

  type TOrderOwner = {
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
  }

  type TOrder = {
    createdAt: string,
    ingredients: TBaseIngredient[]
    name: string
    number: number
    owner: TOrderOwner
    price: number
    status: string
    updatedAt: string
    _id: string
  }
  
  export type TOrderData = {
    name: string,
    order: TOrder
  }

  //ws
  export type TResponseData = {
    orders: ReadonlyArray<TResponseOrderItem>;
    total: number;
    totalToday: number;
  }
  
  export type TResponseOrderItem = {
    ingredients: ReadonlyArray<string>;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  }

  export type TProfilePage = {
    hint: string;
    children: React.ReactNode;
  }