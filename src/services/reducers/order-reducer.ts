import {
    ORDER_REQUEST_LOAD,
    ORDER_REQUEST_ERR,
    SET_ORDER_DATA,
    ORDER_DETAILS_RESET,
    SET_ORDER_MODAL_VISIBLE,
    SET_ORDER_MODAL_INVISIBLE
  } from '../../utils/commons';

  import { TInitialOrderState,
  } from '../../utils/types/reducers/reducers-types'

  import { TOrderTypes } from '../../utils/types/actions/order-types'

export const init:TInitialOrderState = {
    orderName: '',
    orderNumber: null,
    orderRequestLoad: false,
    orderRequestErr: false,
    orderDetailsModal: false,
    orderModalVisibility: false
  }

export const orderReducer = (store = init, action:TOrderTypes) => {
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
      case ORDER_DETAILS_RESET: {
        return {
          ...store,
          ...init
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