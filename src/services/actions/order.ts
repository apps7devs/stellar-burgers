import {api as apiUrl, fetchStatus} from '../../utils/commons'
import { AppDispatch } from '../../utils/types';
import { TPlaceOrder } from '../../utils/types/actions/order-types';

import {
  ORDER_REQUEST_LOAD,
  SET_ORDER_DATA,
  ORDER_REQUEST_ERR,
  SET_ORDER_MODAL_VISIBLE,
  SET_ORDER_MODAL_INVISIBLE,
  COUNTERS_RESET,
  ORDER_DETAILS_RESET,
  CLEAR_INGREDIENTS
} from '../../utils/commons'

import {
  ISetOrderModalVisible,
  ISetOrderModalInvisible,
  IClearCounters,
  ISetOrderDetailsReset,
  IClearIngredients,
  ISetOrderData
} from '../../utils/types/actions/order-types'

export const orderSetOrderDataAction = (data:ISetOrderData) => ({
  type: SET_ORDER_DATA,
  orderData: data
});

export const orderRequestErrAction = () => ({
  type: ORDER_REQUEST_ERR,
  status: true
});

export const orderRequestLoadAction = () => ({
  type: ORDER_REQUEST_LOAD,
  status: false
});

export const setOrderModalVisibleAction = (): ISetOrderModalVisible => ({
  type: SET_ORDER_MODAL_VISIBLE,
  show: true
});

export const setOrderModalInvisibleAction = (): ISetOrderModalInvisible => ({
  type: SET_ORDER_MODAL_INVISIBLE
});

export const clearCountersAction = (): IClearCounters => ({
  type: COUNTERS_RESET,
});

export const orderDetailsResetAction = (): ISetOrderDetailsReset => ({
  type: ORDER_DETAILS_RESET,
});

export const clearIngredientsAction = (): IClearIngredients => ({
  type: CLEAR_INGREDIENTS,
});

export const placeOrder:TPlaceOrder = (orderBody) => {
  return (dispatch: AppDispatch) => {
    dispatch({
        type:ORDER_REQUEST_LOAD,
        status: true
    })
    fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ "ingredients": orderBody }),
    })
    .then(res => fetchStatus(res))
    .then(({ success, order, name }) => {
      if (success) return {order, name}
      return Promise.reject(`err 02 :: ${order}`)
    })
    .then(data => {
      dispatch(orderSetOrderDataAction(data))
    })
    .catch(err => {
      console.log('err 03 :: ', err.message)
      dispatch(orderRequestErrAction())
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(orderRequestLoadAction())
        dispatch(setOrderModalVisibleAction())
      }, 1000);//сервер предоставляющий api "слишком" шустрый =), лоадера не видно
    })
  }
}