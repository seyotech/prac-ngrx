import { createAction, props } from "@ngrx/store";

export const checkAuthStatus = createAction('[Auth] Check Auth Status');
export const authStatusSuccess = createAction(
  '[Auth] Auth Status Success',
  props<{ isLoggedIn: boolean }>()
);