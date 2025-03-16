import {
  CLEAR_INGREDIENTS,
  COUNTERS_RESET,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  SET_ORDER_MODAL_VISIBLE,
  //DELETE_ORDER_NUMBER,
  SET_ORDER_MODAL_INVISIBLE,
  SET_ORDER_DATA,
  ORDER_REQUEST_LOAD,
  ORDER_REQUEST_ERR,
  ORDER_DETAILS_MODAL,
  ORDER_DETAILS_RESET,
} from '../../commons';

export type TPlaceOrder = (info: string[], error: string) => void;

export interface IOrderSubmitSuccess {
  readonly type: typeof ORDER_SUBMIT_SUCCESS;
  readonly number: number;
}

export interface ISetOrderModalVisible {
  readonly type: typeof SET_ORDER_MODAL_VISIBLE;
}

export interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export interface IClearCounters {
  readonly type: typeof COUNTERS_RESET;
}

export interface IOrderSubmitFailure {
  readonly type: typeof ORDER_SUBMIT_FAILURE;
  error: Promise<Error>;
}

// export interface IDeleteOrderNumber {
//   readonly type: typeof DELETE_ORDER_NUMBER;
// };

export interface ISetOrderModalInvisible {
  readonly type: typeof SET_ORDER_MODAL_INVISIBLE;
};

export interface ISetOrderData {
  readonly type: typeof SET_ORDER_DATA;
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

export interface ISetOrderDetailsModal {
  readonly type: typeof ORDER_DETAILS_MODAL;
  show: boolean
};

export interface ISetOrderDetailsReset {
  readonly type: typeof ORDER_DETAILS_RESET;
};

export type TOrderTypes =
  | IOrderSubmitSuccess
  | ISetOrderModalVisible
  | IClearIngredients
  | IClearCounters
  | IOrderSubmitFailure
  //| IDeleteOrderNumber
  | ISetOrderModalInvisible
  | ISetOrderData
  | ISetOrdeRequestLoad
  | ISetOrderRequestErr
  | ISetOrderDetailsModal
  | ISetOrderDetailsReset