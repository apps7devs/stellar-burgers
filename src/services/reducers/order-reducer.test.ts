import { SET_ORDER_DATA, ORDER_REQUEST_LOAD, ORDER_REQUEST_ERR, ORDER_DETAILS_RESET, SET_ORDER_MODAL_VISIBLE, SET_ORDER_MODAL_INVISIBLE } from '../../utils/commons'

import * as actions from '../actions/order';

import { TOrderTypes } from '../../utils/types/actions/order-types';
import {init, orderReducer} from './order-reducer'

const order =  {
  orderData: {
    name: 'Краторный минеральный бургер',
    order: {number: 123456}
  }}

describe('order reducer', () => {
    it('should return the initial state of order-reducer state', () => {
      expect(orderReducer(undefined, {} as TOrderTypes)).toEqual(init)
    });

    it("should handle SET_ORDER_DATA", () => {
      const expectedAction = {
        type: SET_ORDER_DATA,
        orderData: {orderData: {
          name: order.orderData.name,
          order: {number: order.orderData.order.number}
        }},
      }
      expect(actions.orderSetOrderDataAction(order)).toEqual(expectedAction);
    });

    it("should handle ORDER_REQUEST_LOAD", () => {
      const expectedAction = {
        type: ORDER_REQUEST_LOAD,
        status: false
      }
      expect(actions.orderRequestLoadAction()).toEqual(expectedAction);
    });

    it("should handle ORDER_REQUEST_ERR", () => {
      const expectedAction = {
        type: ORDER_REQUEST_ERR,
        status: true
      }
      expect(actions.orderRequestErrAction()).toEqual(expectedAction);
    });

    it("should handle ORDER_DETAILS_RESET", () => {
        const expectedAction = {
        type: ORDER_DETAILS_RESET
      }
      expect(actions.orderDetailsResetAction()).toEqual(expectedAction);
    });

    it("should handle SET_ORDER_MODAL_VISIBLE", () => {
      const expectedAction = {
        type: SET_ORDER_MODAL_VISIBLE,
        show: true
      }
      expect(actions.setOrderModalVisibleAction()).toEqual(expectedAction);
    });
    
    it("should handle SET_ORDER_MODAL_INVISIBLE", () => {
      const expectedAction = {
        type: SET_ORDER_MODAL_INVISIBLE,
      }
      expect(actions.setOrderModalInvisibleAction()).toEqual(expectedAction);
    });
})