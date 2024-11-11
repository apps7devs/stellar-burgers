import {
    ORDER_REQUEST_LOAD,
    ORDER_REQUEST_ERR,
    SET_ORDER_DATA,
    ORDER_DETAILS_MODAL,
    ORDER_DETAILS_RESET
  } from '../actions/order';

const init = {
    orderName: '',
    orderNumber: '',
    orderRequestLoad: false,
    orderRequestErr: false,
    orderDetailsModal: false
  }

export const orderReducer = (store = init, action) => {
    switch (action.type) {
      case SET_ORDER_DATA: {
        return {
          ...store,
          orderName: action.orderData.name,
          orderNumber: action.orderData.order.number
        }
      }
      case ORDER_REQUEST_LOAD: {
        return {
          ...store,
          orderRequestLoad: action.status
        }
      }
      case ORDER_REQUEST_ERR: {
        return {
          ...store,
          orderRequestErr: action.status
        }
      }
      case ORDER_DETAILS_MODAL: {
        return {
          ...store,
          orderDetailsModal: action.show
        }
      }
      case ORDER_DETAILS_RESET: {
        return {
          ...store,
          ...init
        }
      }
      default: {
        return store;
      }
    }
  }