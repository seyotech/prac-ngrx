import { createReducer, on } from '@ngrx/store';

import { addToCart, removeFromCart } from './cart.actions';
import { Product } from '../../models/product.type';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const cartItemsKey = 'cartItems';

export interface State extends EntityState<Product> {}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});
export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    
    const existingProduct = state.entities[product.id];
    console.log(state, existingProduct);
    if (existingProduct) {
      return adapter.updateOne(
        {
          id: product.id,
          changes: { count: (existingProduct.count || 1) + 1 },
        },
        state
      );
    } else {
      return adapter.addOne({ ...product, count: 1 }, state);
    }
  }),
  on(
    removeFromCart,
    (state, { productId }) => adapter.removeOne(productId, state)
    /*
  {
    const existingProducts = state.readingListProducts.filter((product: Product) => product.id !== productId)
    return {
    ...state,
      readingListProducts: existingProducts
    }
  }*/
  )
);

// export const initialState: ICart = {
//   cartItems: [],
//   count: 0
// };

// export const cartReducer = createReducer(
//   initialState,
//   on(addToCart, (state: ICart, product: Product) => {
//     const cartItems = state.cartItems;
//     const existingProduct = cartItems.find((item) => item.id === product.id);
//     if (existingProduct) {
//       const updatedCart = cartItems.map((item) =>
//         item.id === product.id ? { ...item, count: (item.count || 0) + 1 } : item
//       );
//       return {
//         ...state,
//         cartItems: updatedCart,
//         count: state.count + 1,
//       };
//     } else {
//       return {
//         ...state,
//         cartItems: [...cartItems, { ...product, count: 1 }],
//         count: state.count + 1,
//       };
//     }
//   }),
// );
