import { createSelector } from '@ngrx/store';
import { AppState, ICart } from '../app.state';
import { selectAll } from './cart.reducers';

export const selectCartFeature = (state: AppState) => state.cart;

export const selectCartState = createSelector(
  selectCartFeature,
  (cart: ICart) => ({
    cartItems: selectAll(cart),
    count: cart.count,
  })
);

export const selectTotalAmount = createSelector(
  selectCartFeature,
  (cart: ICart) => {
    const cartItems = selectAll(cart);
    return cartItems.reduce(
      (total, item) => total + (item.price ?? 0) * (item.count ?? 1),
      0
    );
  }
);
// export const selectCartState = createSelector(
//   selectCartFeature,
//   (cart: ICart) => ({
//     cartItems: cart.cartItems,
//     count: cart.count
//   })
// );
