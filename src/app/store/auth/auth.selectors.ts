import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authAdapter, AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
} = authAdapter.getSelectors(selectAuthState);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectAuthState,
  (entities, state) => (state.selectedUserId ? entities[state.selectedUserId] : null)
);

export const selectIsLoggedIn = createSelector(
  selectCurrentUser,
  (user) => !!user?.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);