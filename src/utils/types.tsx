import {FormEvent} from 'react'
export type TCurrentIngredientState = {
    currentIngredient: TBaseIngredient;
    ingredientModalVisibility: boolean;
  }

  export type TBaseIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly count: number;
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

type TCookieProps = {
  [key: string]: number | Date | string | boolean;
  expires?: any;
}

export type TGetCookie = (name: string) => string | undefined;

export type TDeleteCookie = (name: string) => void;

export type TSetCookie = (name: string, value: string, props?: TCookieProps) => void;

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


  export type TBurgerIngredientCart = {
    openModal: TOpenModal;
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