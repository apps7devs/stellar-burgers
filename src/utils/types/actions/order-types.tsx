import {
  CLEAR_INGREDIENTS,
  COUNTERS_RESET,
  SET_ORDER_MODAL_VISIBLE,
  SET_ORDER_MODAL_INVISIBLE,
  SET_ORDER_DATA,
  ORDER_REQUEST_LOAD,
  ORDER_REQUEST_ERR,
  ORDER_DETAILS_RESET,
} from '../../commons';

export type TPlaceOrder = (info: string[], error: string) => void;

export interface ISetOrderModalVisible {
  readonly type: typeof SET_ORDER_MODAL_VISIBLE;
  show: boolean
}

export interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export interface IClearCounters {
  readonly type: typeof COUNTERS_RESET;
}

export interface ISetOrderModalInvisible {
  readonly type: typeof SET_ORDER_MODAL_INVISIBLE;
};

export interface ISetOrderData {
  readonly type?: typeof SET_ORDER_DATA;
  readonly orderData: {
     name: string
     order: {number: number}
   }
};

export interface ISetOrdeRequestLoad {
  readonly type: typeof ORDER_REQUEST_LOAD;
  status: boolean
};

export interface ISetOrderRequestErr {
  readonly type: typeof ORDER_REQUEST_ERR;
  status: boolean
};

export interface ISetOrderDetailsReset {
  readonly type: typeof ORDER_DETAILS_RESET;
};

export type TOrderTypes =
  | ISetOrderModalVisible
  | IClearIngredients
  | IClearCounters
  | ISetOrderModalInvisible
  | ISetOrderData
  | ISetOrdeRequestLoad
  | ISetOrderRequestErr
  | ISetOrderDetailsReset