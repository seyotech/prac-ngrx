import { createSelector } from "@ngrx/store";
import { AppState, ICart } from "../app.state";

// Select the cart slice from AppState
export const selectCartFeature = (state: AppState) => state.cart;

// Select the cartItems array from the cart slice
export const selectCart = createSelector(
  selectCartFeature,
  (cart: ICart) => cart.cartItems
);
// export const selectCart = (state: AppState) => state.cart;
// export const selectCartItems = createSelector(
//     selectCart,
//     (cart: ICart) => cart.cart
//   );

// export const selectCartQuantity = createSelector(selectCart, (state) => {
//     return state;
// })



