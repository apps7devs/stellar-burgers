import {
    ORDER_REQUEST_LOAD,
    ORDER_REQUEST_ERR,
    SET_ORDER_DATA,
    ORDER_DETAILS_MODAL,
    ORDER_DETAILS_RESET,
    ORDER_SUBMIT_SUCCESS,
    ORDER_SUBMIT_FAILURE,
    SET_ORDER_MODAL_VISIBLE,
    SET_ORDER_MODAL_INVISIBLE
  } from '../actions/order';

const init = {
    orderName: '',
    orderNumber: '',
    orderRequestLoad: false,
    orderRequestErr: false,
    orderDetailsModal: false,
    orderModalVisibility: false
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
      case ORDER_SUBMIT_SUCCESS: {
        return {
          ...store,
          orderNumber: action.number,
          orderError: ''
        }
      }
      case ORDER_SUBMIT_FAILURE: {
        return {
          ...store,
          orderError: action.error
        }
      }
      case SET_ORDER_MODAL_VISIBLE: {
        return {
          ...store,
          orderModalVisibility: true
        }
      }
      case SET_ORDER_MODAL_INVISIBLE: {
        return {
          ...store,
          orderModalVisibility: false
        }
      }
      default: {
        return store;
      }
    }
  }