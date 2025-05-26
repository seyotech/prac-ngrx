
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../models/product.type';

export interface AuthState extends EntityState<User> {
  selectedUserId: string | null; // To track the logged-in user
  error: string | null;
  isLoading: boolean;
}

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.username, // Use username as the unique ID
});

export const initialAuthState: AuthState = authAdapter.getInitialState({
  selectedUserId: null,
  error: null,
  isLoading: false,
});

// export interface AuthState extends EntityState<any> {
//   selectedUserId: string | null;
//   error: string | null;
//   isLoading: boolean;
// }

// export const authAdapter: EntityAdapter<any> = createEntityAdapter<any>();

// export const initialState: AuthState = authAdapter.getInitialState({
//   selectedUserId: null,
//   error: null,
//   isLoading: false,
// });