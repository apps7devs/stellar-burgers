import { TWSState } from "../../utils/types/reducers/ws-reducer-types";
import { TWSTypes } from "../../utils/types/actions/ws-types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_CURRENTFEEDID,
  SET_FEED_MODAL_VISIBILITY
} from '../../utils/commons';

const initialWSState: TWSState = {
  wsConnected: false,
  responseData: null,
  wsError: undefined,
  orderFeedModalVisibility: false,
  currentFeedId: null,
};

export const wsReducer = (state: TWSState = initialWSState, action: TWSTypes) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        responseData: action.responseData
      }
    case WS_GET_CURRENTFEEDID:
      return {
        ...state,
        currentFeedId: action.currentFeedId
      }
    case SET_FEED_MODAL_VISIBILITY:
      return {
        ...state,
        orderFeedModalVisibility: action.orderFeedModalVisibility,
        currentFeedId: null

      }
    default:
      return state;
  }
};
