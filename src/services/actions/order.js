import {api as apiUrl, fetchStatus} from '../../utils/commons'

export const ORDER_REQUEST_LOAD = 'ORDER_REQUEST_LOAD';
export const ORDER_REQUEST_ERR = 'ORDER_REQUEST_ERR';
export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const ORDER_DETAILS_MODAL = 'ORDER_DETAILS_MODAL';
export const ORDER_DETAILS_RESET = 'ORDER_DETAILS_RESET';

export const ORDER_SUBMIT_SUCCESS = 'ORDER_SUBMIT_SUCCESS';
export const ORDER_SUBMIT_FAILURE = 'ORDER_SUBMIT_FAILURE';
export const SET_ORDER_MODAL_VISIBLE = 'SET_ORDER_MODAL_VISIBLE';
export const SET_ORDER_MODAL_INVISIBLE = 'SET_ORDER_MODAL_INVISIBLE';


export function placeOrder(orderBody) {
  return (dispatch) => {
    dispatch({
        type:ORDER_REQUEST_LOAD,
        status: true
    })
    fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "ingredients": orderBody }),
    })
    .then(res => fetchStatus(res))
    .then(({ success, order, name }) => {
      if (success) return {order, name}
      return Promise.reject(`err 02 :: ${order}`)
    })
    .then(data => {
      dispatch({
        type: SET_ORDER_DATA,
        orderData: data
      })
    })
    .catch(err => {
      console.log('err 03 :: ', err.message)
      dispatch({
        type: ORDER_REQUEST_ERR,
        status: true
      })
    })
    .finally(() => {
      setTimeout(() => {
        dispatch({
          type: ORDER_REQUEST_LOAD,
          status: false
        })
        dispatch({
          type: SET_ORDER_MODAL_VISIBLE,
          show: true
        })
      }, 1000);//сервер предоставляющий api "слишком" шустрый =), лоадера не видно
    })
  }
}