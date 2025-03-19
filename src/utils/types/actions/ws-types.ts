import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_CURRENTFEEDID,
  SET_FEED_MODAL_VISIBILITY,
} from '../../commons';
import { TResponseData } from '../../types';

export type TWsActions = {
  wsInit: typeof WS_CONNECTION_START,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE,
}

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START,
  payload?: any,
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
  payload?: any,
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
  payload?: any,
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED,
  payload?: any,
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE,
  readonly responseData: TResponseData,
  payload?: any,
}

export interface IGetCurrentFeedId {
  readonly type: typeof WS_GET_CURRENTFEEDID,
  readonly currentFeedId: string,
  payload?: any,
}

export interface IsetFeedModalVisibility {
  readonly type: typeof SET_FEED_MODAL_VISIBILITY,
  readonly orderFeedModalVisibility: boolean,
  payload?: any,
}

export type TWSTypes =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IGetCurrentFeedId
  | IsetFeedModalVisibility;

