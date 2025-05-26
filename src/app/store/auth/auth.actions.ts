import { createAction, props } from "@ngrx/store";
import { User } from '../../models/product.type';

export const checkAuthStatus = createAction('[Auth] Check Auth Status');
export const authStatusSuccess = createAction(
  '[Auth] Auth Status Success',
  props<{ isLoggedIn: boolean }>()
);


export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { username: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');