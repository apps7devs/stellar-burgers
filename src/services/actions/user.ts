import { checkStatus } from '../../utils/check-status';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { refreshFetch } from '../../utils/refresh-fetch';
import { AppDispatch } from '../../utils/types';
import { 
  api,
  SET_USER_LOGGED_IN_STATE,
  SET_USER_STATE,
  DELETE_USER_STATE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_LOGGING_IN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_LOGIN_STATE,
  //CLEAR_LOGIN_STATE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  SET_REGISTRATION_STATE,
  CLEAR_REGISTRATION_STATE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_FORGOT_PASSWORD_STATE,
  CLEAR_FORGOT_PASSWORD_STATE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_RESET_PASSWORD_STATE,
  CLEAR_RESET_PASSWORD_STATE,
  SESSION_TERMINATION_SUCCESS,
  SESSION_TERMINATION_FAILURE,
  SET_SESSION_TERMINATION_STATE,
  CLEAR_SESSION_TERMINATION_STATE,
} from '../../utils/commons';
import {
  IUserRegistrationSuccess,
  ISetRegistrationState,
  IUserRegistrationFailure,
  ISetLoggingIn,
  IUserLoginSuccess,
  IUserLoginFailure,
  ISetLoginState,
  ISetUserLoggedInState,
  IForgotPasswordSuccess,
  IForgotPasswordState,
  IForgotPasswordFailure,
  IResetPasswordSuccess,
  IResetPasswordState,
  IResetPasswordFailure,
  IGetUserSuccess,
  ISetUserState,
  IGetUserFailure,
  IUpdateUserSuccess,
  IUpdateUserFailure,
  ISessionTerminationSuccess,
  IDeleteUserState,
  ISetSessionTerminationState,
  ISessionTerminationFailure,
  IClearRegistrationState,
  IClearForgotPasswordState,
  IClearResetPasswordState,
  IClearSessionTerminationState,
  TUser,
  TRegister,
  TLogin,
  TGetUser,
  TDeleteUser,
  TForgotPassword,
  TResetPassword,
  TUpdateUser,
} from '../../utils/types/actions/user-types';

// register
const userRegistrationSuccessAction = (): IUserRegistrationSuccess => ({
  type: USER_REGISTRATION_SUCCESS,
  registerError: ""
});

const setRegistrationStateAction = (state: boolean): ISetRegistrationState => ({
  type: SET_REGISTRATION_STATE,
  register_success: state
});

const userRegistrationFailureAction = (error: Promise<Error>): IUserRegistrationFailure => ({
  type: USER_REGISTRATION_FAILURE,
  registerError: error
});

// log in
const setLoggingInAction = (state: boolean): ISetLoggingIn => ({
  type: SET_LOGGING_IN,
  loggingIn: state
});

const userLoginSuccessAction = (data: TUser): IUserLoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  user: data,
  loginError: ""
});

const userLoginFailureAction = (error: Promise<Error>): IUserLoginFailure => ({
  type: USER_LOGIN_FAILURE,
  loginError: error
});

const setLoginStateAction = (state: boolean): ISetLoginState => ({
  type: SET_LOGIN_STATE,
  login_success: state
});

const setUserLoggedInStateAction = (state: boolean): ISetUserLoggedInState => ({
  type: SET_USER_LOGGED_IN_STATE,
  isLoggedIn: state
});

// forgot passw
const forgotPasswordSuccessAction = (): IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
  error: ""
});

const setForgotPasswordStateAction = (state: boolean): IForgotPasswordState => ({
  type: SET_FORGOT_PASSWORD_STATE,
  forgot_password_success: state
});

const forgotPasswordFailureAction = (error: Promise<Error>): IForgotPasswordFailure => ({
  type: FORGOT_PASSWORD_FAILURE,
  error: error
});

// reset passw
const resetPasswordSuccessAction = (): IResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
  resetPassowrdError: ""
});

const resetPasswordFailureAction = (error: Promise<Error>): IResetPasswordFailure => ({
  type: RESET_PASSWORD_FAILURE,
  resetPassowrdError: error
});

const setResetPasswordStateAction = (state: boolean): IResetPasswordState => ({
  type: SET_RESET_PASSWORD_STATE,
  reset_password_success: state
});

const getUserSuccessAction = (): IGetUserSuccess => ({
  type: GET_USER_SUCCESS,
  authError: ""
});

const getUserFailureAction = (error: Promise<Error>): IGetUserFailure => ({
  type: GET_USER_FAILURE,
  authError: error
});

const setUserStateAction = (data: TUser): ISetUserState => ({
  type: SET_USER_STATE,
  user: data
});

const updateUserSuccessAction = (): IUpdateUserSuccess => ({
  type: UPDATE_USER_SUCCESS,
  updateError: ""
});

const updateUserFailureAction = (error: Promise<Error>): IUpdateUserFailure => ({
  type: UPDATE_USER_FAILURE,
  updateError: error
});

const sessionTerminationSuccessAction = (): ISessionTerminationSuccess => ({
  type: SESSION_TERMINATION_SUCCESS,
  deleteUserError: ""
});

const deleteUserStateAction = (): IDeleteUserState => ({
  type: DELETE_USER_STATE,
  user: {}
});

const setSessionTerminationStateAction = (state: boolean): ISetSessionTerminationState => ({
  type: SET_SESSION_TERMINATION_STATE,
  delete_user_success: state
});

const sessionTerminationFailureAction = (error: Promise<Error>): ISessionTerminationFailure => ({
  type: SESSION_TERMINATION_FAILURE,
  deleteUserError: error
});

export const clearRegistrationStateAction = (): IClearRegistrationState => ({
  type: CLEAR_REGISTRATION_STATE,
});

export const clearForgotPasswordStateAction = (): IClearForgotPasswordState => ({
  type: CLEAR_FORGOT_PASSWORD_STATE,
});

export const clearResetPasswordStateAction = (): IClearResetPasswordState => ({
  type: CLEAR_RESET_PASSWORD_STATE,
});

export const clearSessionTerminationStateAction = (): IClearSessionTerminationState => ({
  type: CLEAR_SESSION_TERMINATION_STATE,
});


export const login: TLogin = (email, password) => {
    return function (dispatch: AppDispatch) {
      dispatch(setLoggingInAction(true))
      fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        }),
      })
        .then((res) => checkStatus(res))
        .then((res) => {
          if (res && res.success) {
            let authToken;
            let refreshToken;
            authToken = res.accessToken.split('Bearer ')[1];
            refreshToken = res.refreshToken;
            if (authToken && refreshToken) {
              // setCookie('token', authToken);
              // setCookie('refreshToken', refreshToken);
              localStorage.setItem('token', authToken);
              localStorage.setItem('refreshToken', refreshToken);
            }
            dispatch(userLoginSuccessAction(res.user))
            dispatch(setLoginStateAction(true))
            dispatch(setUserLoggedInStateAction(true))
          }
        })
        .then(() => {
          dispatch(setLoggingInAction(false))
        })
        .catch((err) => {
          dispatch(userLoginFailureAction(err))
          dispatch(setLoginStateAction(false))
          dispatch(setLoggingInAction(false))
          console.log(err);
        })
        .finally(() => {
          dispatch(setLoggingInAction(false))
        })
    }
  }

export const getUser: TGetUser = () => {
  console.log(123)
    return function (dispatch: AppDispatch) {
      dispatch(setLoggingInAction(true))
      refreshFetch(`${api}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${getCookie('token')}`
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then((res) => {
          dispatch(getUserSuccessAction())
          dispatch(setUserStateAction(res.user))
          dispatch(setUserLoggedInStateAction(true))
        })
        .then(() => {
          dispatch(setLoggingInAction(false))
        })
        .catch((err) => {
          console.log('user failure')
          dispatch(getUserFailureAction(err))
          dispatch(setUserLoggedInStateAction(false))
          dispatch(setLoggingInAction(false))
          console.log(err);
        })
        .finally(() => {
          dispatch(setLoggingInAction(false))
        })
    }
  }

export const register: TRegister = (name, email, password) => {
  return function (dispatch: AppDispatch) {
    fetch(`${api}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch(userRegistrationSuccessAction())
          dispatch(setRegistrationStateAction(true))
        }
      })
      .catch((err) => {
        dispatch(userRegistrationFailureAction(err))
        dispatch(setRegistrationStateAction(false))
        console.log(err);
      })
  }
}

export const deleteUser: TDeleteUser = () => {
  //const refreshToken = getCookie('refreshToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return function (dispatch: AppDispatch) {
    fetch(`${api}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch(sessionTerminationSuccessAction())
          dispatch(deleteUserStateAction())
          dispatch(setSessionTerminationStateAction(true))
          dispatch(setUserLoggedInStateAction(false))
          // deleteCookie('token');
          // deleteCookie('refreshToken');
          //localStorage.removeItem('token')
          //localStorage.removeItem('refreshToken')
        }
      })
      .catch((err) => {
        dispatch(sessionTerminationFailureAction(err))
        dispatch(setSessionTerminationStateAction(false))
        console.log(err);
      })
      .finally(()=>{
        // deleteCookie('token');
        // deleteCookie('refreshToken');
        //localStorage.removeItem('token')
        //localStorage.removeItem('refreshToken')
      })
  }
}

export const updateUser: TUpdateUser = (userData) => {
  return function (dispatch: AppDispatch) {
    refreshFetch(`${api}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        //authorization: `Bearer ${getCookie('token')}`,
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": userData?.name,
        "email": userData?.email
      }),
    })
      .then((res) => {
        dispatch(updateUserSuccessAction())
        dispatch(setUserStateAction(res.user))
      })
      .catch((err) => {
        dispatch(updateUserFailureAction(err))
        console.log(err);
      })
  }
}

export const forgotPassword:TForgotPassword = (email) => {
  return function (dispatch: AppDispatch) {
    fetch(`${api}/password-reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch(forgotPasswordSuccessAction())
          dispatch(setForgotPasswordStateAction(true))
        }
      })
      .catch((err) => {
        dispatch(forgotPasswordFailureAction(err))
        dispatch(setForgotPasswordStateAction(false))
        console.log(err);
      })
  }
}

export const resetPassword: TResetPassword = (password, token) => {
  return function (dispatch: AppDispatch) {
    fetch(`${api}/password-reset/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "password": password,
        "token": token
      }),
    })
      .then((res) => checkStatus(res))
      .then((res) => {
        if (res && res.success) {
          dispatch(resetPasswordSuccessAction())
          dispatch(setResetPasswordStateAction(true))
        }
      })
      .catch((err) => {
        dispatch(resetPasswordFailureAction(err))
        dispatch(setResetPasswordStateAction(false))
        console.log(err);
      })
  }
}