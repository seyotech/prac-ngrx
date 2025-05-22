import { createSelector } from "@ngrx/store";
import { AppState, ICart } from "../app.state";

export const selectCart = (state: AppState) => state.cart;
// export const selectCartItems = createSelector(
//     selectCart,
//     (cart: ICart) => cart.cart
//   );

export const selectCartQuantity = createSelector(selectCart, (state) => {
    return state.count;
})