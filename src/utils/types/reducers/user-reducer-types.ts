import { TUser } from "../actions/user-types"

export type TInitialUserState = {
  user: TUser;
  isLoggedIn: boolean;
  loggingIn: boolean;
  registerError: string;
  loginError: string;
  forgotPassowrdError: string;
  resetPassowrdError: string;
  authError: string;
  updateError: string;
  deleteUserError: string;
  register_success: boolean;
  login_success: boolean;
  forgot_password_success: boolean;
  reset_password_success: boolean;
  delete_user_success: boolean;
}
