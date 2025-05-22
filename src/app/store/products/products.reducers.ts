import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess } from './products.actions';
import { AppState } from '../app.state';

export const initialState: any = {
  cart: [],
  products: [],
  //   vegetables: []
};

export const productsReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state: AppState, { products }) => {
    console.log(products);
    return { ...state, products };
  })
);
