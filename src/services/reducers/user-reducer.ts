import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  SET_REGISTRATION_STATE,
  CLEAR_REGISTRATION_STATE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_LOGIN_STATE,
  //CLEAR_LOGIN_STATE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_FORGOT_PASSWORD_STATE,
  CLEAR_FORGOT_PASSWORD_STATE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_RESET_PASSWORD_STATE,
  CLEAR_RESET_PASSWORD_STATE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SET_USER_STATE,
  DELETE_USER_STATE,
  SET_USER_LOGGED_IN_STATE,
  SESSION_TERMINATION_SUCCESS,
  SESSION_TERMINATION_FAILURE,
  SET_SESSION_TERMINATION_STATE,
  CLEAR_SESSION_TERMINATION_STATE,
  SET_LOGGING_IN
} from '../../utils/commons';

const initialUserState = {
  user: {},
  isLoggedIn: false,
  loggingIn: true,
  registerError: "",
  loginError: "",
  forgotPassowrdError: "",
  resetPassowrdError: "",
  authError: "",
  updateError: "",
  deleteUserError: "",
  register_success: false,
  login_success: false,
  forgot_password_success: false,
  reset_password_success: false,
  delete_user_success: false
}

import { TInitialUserState } from '../../utils/types/reducers/user-reducer-types';
import { TUserTypes } from '../../utils/types/actions/user-types';

export const userReducer = (state: TInitialUserState = initialUserState, action: TUserTypes) => {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerError: action.registerError,
      }
    }
    case USER_REGISTRATION_FAILURE: {
      return {
        ...state,
        registerError: action.registerError,
      }
    }
    case SET_REGISTRATION_STATE: {
      return {
        ...state,
        register_success: action.register_success
      }
    }
    case CLEAR_REGISTRATION_STATE: {
      return {
        ...state,
        registerError: "",
        register_success: false
      }
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginError: action.loginError
      }
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        user: {},
        loginError: action.loginError
      }
    }
    case SET_LOGIN_STATE: {
      return {
        ...state,
        login_success: action.login_success
      }
    }
    /*case CLEAR_LOGIN_STATE: {
      return {
        ...state,
        loginError: "",
        login_success: false
      }
    }*/
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassowrdError: action.error
      }
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        forgotPassowrdError: action.error
      }
    }
    case SET_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        forgot_password_success: action.forgot_password_success,
      }
    }
    case CLEAR_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        forgot_password_success: false,
        forgotPassowrdError: ""
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassowrdError: action.resetPassowrdError
      }
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        resetPassowrdError: action.resetPassowrdError
      }
    }
    case SET_RESET_PASSWORD_STATE: {
      return {
        ...state,
        reset_password_success: action.reset_password_success,
      }
    }
    case CLEAR_RESET_PASSWORD_STATE: {
      return {
        ...state,
        reset_password_success: false,
        resetPassowrdError: ""
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        authError: action.authError
      }
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        authError: action.authError
      }
    }
    case SET_USER_LOGGED_IN_STATE: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateError: action.updateError
      }
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        updateError: action.updateError
      }
    }
    case SET_USER_STATE: {
      return {
        ...state,
        user: action.user,
      }
    }
    case DELETE_USER_STATE: {
      return {
        ...state,
        user: action.user,
      }
    }
    case SESSION_TERMINATION_SUCCESS: {
      return {
        ...state,
        deleteUserError: action.deleteUserError
      }
    }
    case SESSION_TERMINATION_FAILURE: {
      return {
        ...state,
        deleteUserError: action.deleteUserError
      }
    }
    case SET_SESSION_TERMINATION_STATE: {
      return {
        ...state,
        delete_user_success: action.delete_user_success
      }
    }
    case CLEAR_SESSION_TERMINATION_STATE: {
      return {
        ...state,
        user: {},
        deleteUserError: "",
        delete_user_success: false
      }
    }
    case SET_LOGGING_IN: {
      return {
        ...state,
        loggingIn: action.loggingIn
      }
    }
    default: {
      return state;
    }
  }
}