import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer  from '../services/reducers/root-reducer';
import { socketMiddleware } from '../utils/socket-middleware';
import { TWsActions } from '../utils/types/actions/ws-types';
import { compose } from 'redux';
import { wsFeedUrl } from '../utils/commons';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../utils/commons';


const wsActions: TWsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsFeedUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);