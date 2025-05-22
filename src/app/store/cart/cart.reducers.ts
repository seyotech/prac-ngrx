import { createReducer, on } from '@ngrx/store';

import { ICart } from '../app.state';
import { addToCart } from './cart.actions';
import { Product } from '../../models/product.type';

export const initialState: ICart = {
  cartItems: [],
  count: 0
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state: ICart, product: Product) => {
    const cartItems = state.cartItems;
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, count: (item.count || 0) + 1 } : item
      );
      return {
        ...state,
        cartItems: updatedCart,
        count: state.count + 1,
      };
    } else {
      return {
        ...state,
        cartItems: [...cartItems, { ...product, count: 1 }],
        count: state.count + 1,
      };
    }
  }),
//   on(removeFromCart, (state: ICart, {product: Product, decreaseOnly: boolean = true}) => {
//     const existingProduct = this.cartItems.find(item => item.id === product.id);
//     if (existingProduct) {
//       if (decreaseOnly && existingProduct.count! > 1) {
//         existingProduct.count! -= 1;  // Decrease the count
//       } else {
//         // If count is 1 or if we want to remove entirely
//         this.cartItems = this.cartItems.filter(item => item.id !== product.id);  // Remove the product
//       }
//       this.cartItemsSubject.next(this.cartItems);  // Emit updated cart items
//     }
//   })
);