import { createReducer, on } from '@ngrx/store';
import { authAdapter, AuthState, initialAuthState } from './auth.state';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state) => {
    console.log('fffs', state);
    
    return {
        ...state,
        isLoading: true,
        error: null,
      }
  }),
  on(loginSuccess, (state, { user }) => {
    console.log(state, user);
    
    return authAdapter.addOne(user, {
        ...state,
        selectedUserId: user.username,
        isLoading: false,
        error: null,
      })
  }
    
  ),
  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(logout, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(logoutSuccess, (state) =>
    authAdapter.removeAll({
      ...state,
      selectedUserId: null,
      isLoading: false,
      error: null,
    })
  )
);