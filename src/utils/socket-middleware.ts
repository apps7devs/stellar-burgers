import { TWSTypes } from './types/actions/ws-types';
import { TWsActions } from './types/actions/ws-types';
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './types';
import { getCookie } from './cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSTypes) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit && payload.toString().includes(`${getCookie('token')}`)) {
        socket = new WebSocket(
          `${wsUrl}?token=${getCookie('token')
            ?.split("Bearer ")
            .join("")}`
        );
      } else if (type === wsInit) {
        const endpoint = payload;
        socket = new WebSocket(`${wsUrl}${endpoint}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, responseData: restParsedData });
        };
        if (onClose && type === onClose && socket) {
          socket.close();

          socket = null;
          dispatch({ type: onClose });
        }
      }
      next(action);
    };
  }) as Middleware;
}