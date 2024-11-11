import {api as apiUrl} from '../../utils/commons'

export const ORDER_REQUEST_LOAD = 'ORDER_REQUEST_LOAD';
export const ORDER_REQUEST_ERR = 'ORDER_REQUEST_ERR';
export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const ORDER_DETAILS_MODAL = 'ORDER_DETAILS_MODAL';
export const ORDER_DETAILS_RESET = 'ORDER_DETAILS_RESET';


export function placeOrder(orderBody) {
  return function (dispatch) {
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
    .then(res => {
      if (res.ok) return res.json()
        return Promise.reject(`err 01 :: ${res.status}`)
      })
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
            type: ORDER_DETAILS_MODAL,
            show: true
          })
        }, 1000);//сервер предоставляющий api "слишком" шустрый =), лоадера не видно
      })
  }
}