import { userReducer, initialUserState } from "./user-reducer";
import { TUserTypes } from "../../utils/types/actions/user-types";
import * as actions from '../actions/user';
import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  SET_REGISTRATION_STATE,
  CLEAR_REGISTRATION_STATE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_LOGIN_STATE,
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

const userData = {
  name: 'test',
  email: 'test@test.ru'
}

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {} as TUserTypes)).toEqual(initialUserState);
  });

  it("should handle USER_REGISTRATION_SUCCESS", () => {
    const expectedAction = {
      type: USER_REGISTRATION_SUCCESS,
      registerError: ''
    }
    expect(actions.userRegistrationSuccessAction()).toEqual(expectedAction);
  });

  it("should handle USER_REGISTRATION_FAILURE", () => {
    const expectedAction = {
      type: USER_REGISTRATION_FAILURE,
      registerError: 'ошибка'
    }
    // @ts-ignore
    expect(actions.userRegistrationFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_REGISTRATION_STATE", () => {
    const expectedActionTrue = {
      type: SET_REGISTRATION_STATE,
      register_success: true
    }
    const expectedActionFalse = {
      type: SET_REGISTRATION_STATE,
      register_success: false
    }
    expect(actions.setRegistrationStateAction(true)).toEqual(expectedActionTrue);
    expect(actions.setRegistrationStateAction(false)).toEqual(expectedActionFalse);
  });

  it("should handle CLEAR_REGISTRATION_STATE", () => {
    const expectedAction = {
      type: CLEAR_REGISTRATION_STATE
    }
    expect(actions.clearRegistrationStateAction()).toEqual(expectedAction);
  });

  it("should handle USER_LOGIN_SUCCESS", () => {
    const expectedAction = {
      type: USER_LOGIN_SUCCESS,
      user: userData,
      loginError: ''
    }
    expect(actions.userLoginSuccessAction(userData)).toEqual(expectedAction);
  });

  it("should handle USER_LOGIN_FAILURE", () => {
    const expectedAction = {
      type: USER_LOGIN_FAILURE,
      loginError: 'ошибка'
    }
    // @ts-ignore
    expect(actions.userLoginFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_LOGIN_STATE", () => {
    const expectedActionTrue = {
      type: SET_LOGIN_STATE,
      login_success: true
    }
    const expectedActionFalse = {
      type: SET_LOGIN_STATE,
      login_success: false
    }
    expect(actions.setLoginStateAction(true)).toEqual(expectedActionTrue);
    expect(actions.setLoginStateAction(false)).toEqual(expectedActionFalse);
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    const expectedAction = {
      type: FORGOT_PASSWORD_SUCCESS,
      error: ''
    }
    expect(actions.forgotPasswordSuccessAction()).toEqual(expectedAction);
  });

  it("should handle FORGOT_PASSWORD_FAILURE", () => {
    const expectedAction = {
      type: FORGOT_PASSWORD_FAILURE,
      error: 'ошибка'
    }
       // @ts-ignore
    expect(actions.forgotPasswordFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_FORGOT_PASSWORD_STATE", () => {
    const expectedActionTrue = {
      type: SET_FORGOT_PASSWORD_STATE,
      forgot_password_success: true
    }
    const expectedActionFalse = {
      type: SET_FORGOT_PASSWORD_STATE,
      forgot_password_success: false
    }
    expect(actions.setForgotPasswordStateAction(true)).toEqual(expectedActionTrue);
    expect(actions.setForgotPasswordStateAction(false)).toEqual(expectedActionFalse);
  });

  it("should handle CLEAR_FORGOT_PASSWORD_STATE", () => {
    const expectedAction = {
      type: CLEAR_FORGOT_PASSWORD_STATE
    }
    expect(actions.clearForgotPasswordStateAction()).toEqual(expectedAction);
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    const expectedAction = {
      type: RESET_PASSWORD_SUCCESS,
      resetPassowrdError: ''
    }
    expect(actions.resetPasswordSuccessAction()).toEqual(expectedAction);
  });

  it("should handle RESET_PASSWORD_FAILURE", () => {
    const expectedAction = {
      type: RESET_PASSWORD_FAILURE,
      resetPassowrdError: 'ошибка'
    }
       // @ts-ignore
    expect(actions.resetPasswordFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_RESET_PASSWORD_STATE", () => {
    const expectedActionTrue = {
      type: SET_RESET_PASSWORD_STATE,
      reset_password_success: true
    }
    const expectedActionFalse = {
      type: SET_RESET_PASSWORD_STATE,
      reset_password_success: false
    }
    expect(actions.setResetPasswordStateAction(true)).toEqual(expectedActionTrue);
    expect(actions.setResetPasswordStateAction(false)).toEqual(expectedActionFalse);
  });

  it("should handle CLEAR_RESET_PASSWORD_STATE", () => {
    const expectedAction = {
      type: CLEAR_RESET_PASSWORD_STATE
    }
    expect(actions.clearResetPasswordStateAction()).toEqual(expectedAction);
  });

  it("should handle GET_USER_SUCCESS", () => {
    const expectedAction = {
      type: GET_USER_SUCCESS,
      authError: ''
    }
    expect(actions.getUserSuccessAction()).toEqual(expectedAction);
  });

  it("should handle GET_USER_FAILURE", () => {
    const expectedAction = {
      type: GET_USER_FAILURE,
      authError: 'ошибка'
    }
       // @ts-ignore
    expect(actions.getUserFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    const expectedAction = {
      type: UPDATE_USER_SUCCESS,
      updateError: ''
    }
    expect(actions.updateUserSuccessAction()).toEqual(expectedAction);
  });

  it("should handle UPDATE_USER_FAILURE", () => {
    const expectedAction = {
      type: UPDATE_USER_FAILURE,
      updateError: 'ошибка'
    }
       // @ts-ignore
    expect(actions.updateUserFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_USER_STATE", () => {
    const expectedAction = {
      type: SET_USER_STATE,
      user: userData
    }
    expect(actions.setUserStateAction(userData)).toEqual(expectedAction);
  });

  it("should handle DELETE_USER_STATE", () => {
    const expectedAction = {
      type: DELETE_USER_STATE,
      user: {}
    }
    expect(actions.deleteUserStateAction()).toEqual(expectedAction);
  });

  it("should handle SET_USER_LOGGED_IN_STATE", () => {
    const expectedActionTrue = {
      type: SET_USER_LOGGED_IN_STATE,
      isLoggedIn: true
    }
    const expectedActionFalse = {
      type: SET_USER_LOGGED_IN_STATE,
      isLoggedIn: false
    }
    expect(actions.setUserLoggedInStateAction(true)).toEqual(expectedActionTrue);
    expect(actions.setUserLoggedInStateAction(false)).toEqual(expectedActionFalse);
  });

  it("should handle SESSION_TERMINATION_SUCCESS", () => {
    const expectedAction = {
      type: SESSION_TERMINATION_SUCCESS,
      deleteUserError: ''
    }
    expect(actions.sessionTerminationSuccessAction()).toEqual(expectedAction);
  });

  it("should handle SESSION_TERMINATION_FAILURE", () => {
    const expectedAction = {
      type: SESSION_TERMINATION_FAILURE,
      deleteUserError: 'ошибка'
    }
       // @ts-ignore
    expect(actions.sessionTerminationFailureAction('ошибка')).toEqual(expectedAction);
  });

  it("should handle SET_SESSION_TERMINATION_STATE", () => {
    const expectedActionTrue = {
      type: SET_SESSION_TERMINATION_STATE,
      delete_user_success: true
    }
    const expectedActionFalse = {
      type: SET_SESSION_TERMINATION_STATE,
      delete_user_success: false
    }
    expect(actions.setSessionTerminationStateAction(true)).toEqual(expectedActionTrue);
    expect(actions.setSessionTerminationStateAction(false)).toEqual(expectedActionFalse);
  });

  it("should handle CLEAR_SESSION_TERMINATION_STATE", () => {
    const expectedAction = {
      type: CLEAR_SESSION_TERMINATION_STATE
    }
    expect(actions.clearSessionTerminationStateAction()).toEqual(expectedAction);
  });

  it("should handle SET_LOGGING_IN", () => {
    const expectedActionTrue = {
      type: SET_LOGGING_IN,
      loggingIn: true
    }
    const expectedActionFalse = {
      type: SET_LOGGING_IN,
      loggingIn: false
    }
    expect(actions.setLoggingInAction(true)).toEqual(expectedActionTrue);
    expect(actions.setLoggingInAction(false)).toEqual(expectedActionFalse);
  });
})