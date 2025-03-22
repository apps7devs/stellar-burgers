import * as actions from '../actions/ws-actions';
import { TWSTypes } from '../../utils/types/actions/ws-types';
import { wsReducer, initialWSState } from './ws-reducer';
import { TResponseData } from '../../utils/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_CURRENTFEEDID,
  SET_FEED_MODAL_VISIBILITY
} from '../../utils/commons';

const responseData: TResponseData = {
  "orders": [
    {
      "_id": "62aaf983fa747e001bd52a45",
      "ingredients": [
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
      "createdAt": "2022-06-16T09:36:03.590Z",
      "updatedAt": "2022-06-16T09:36:03.994Z",
      "number": 17867
    },
    {
      "_id": "62aaf90ffa747e001bd52a41",
      "ingredients": [
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
      "createdAt": "2022-06-16T09:34:07.746Z",
      "updatedAt": "2022-06-16T09:34:08.113Z",
      "number": 17866
    },
    {
      "_id": "62aaf6c9fa747e001bd52a36",
      "ingredients": [
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
      "createdAt": "2022-06-16T09:24:25.682Z",
      "updatedAt": "2022-06-16T09:24:26.030Z",
      "number": 17865
    }
  ],
  "total": 17780,
  "totalToday": 230
}

describe("ws-reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as TWSTypes)).toEqual(initialWSState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    const expectedAction = {
      type: WS_CONNECTION_SUCCESS
    }
    expect(actions.WSConnectionSuccessAction()).toEqual(expectedAction);
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    const expectedAction = {
      type: WS_CONNECTION_ERROR
    }
    expect(actions.WSConnectionErrorAction()).toEqual(expectedAction);
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    const expectedAction = {
      type: WS_CONNECTION_CLOSED
    }
    expect(actions.WSConnectionClosedAction()).toEqual(expectedAction);
  });

  it("should handle WS_GET_MESSAGE", () => {
    const expectedAction = {
      type: WS_GET_MESSAGE,
      responseData: responseData
    }
    expect(actions.WSGetMessageAction(responseData)).toEqual(expectedAction);
  });

  it("should handle WS_GET_CURRENTFEEDID", () => {
    const expectedAction = {
      type: WS_GET_CURRENTFEEDID,
      currentFeedId: '62aaf6c9fa747e001bd52a36'
    }
    expect(actions.getCurrentFeedIdAction('62aaf6c9fa747e001bd52a36')).toEqual(expectedAction);
  });

  it("should handle SET_FEED_MODAL_VISIBILITY", () => {
    const expectedActionTrue = {
      type: SET_FEED_MODAL_VISIBILITY,
      orderFeedModalVisibility: true,
    }
    const expectedActionFalse = {
      type: SET_FEED_MODAL_VISIBILITY,
      orderFeedModalVisibility: false,
    }
    expect(actions.setFeedModalVisibilityAction(true)).toEqual(expectedActionTrue);
    expect(actions.setFeedModalVisibilityAction(false)).toEqual(expectedActionFalse);
  });
});