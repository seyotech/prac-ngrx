import { createReducer, on } from '@ngrx/store';
import { productAdapter, initialProductState } from './products.state';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  loadProductsByCategory,
  loadProductsByCategorySuccess,
  loadProductsByCategoryFailure,
} from './products.actions';

export const productsReducer = createReducer(
  initialProductState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsByCategory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, { products, total }) =>
    productAdapter.setAll(products, {
      ...state,
      total,
      loading: false,
      error: null,
    })
  ),
  on(loadProductsByCategorySuccess, (state, { products, total }) =>
    productAdapter.setAll(products, {
      ...state,
      total,
      loading: false,
      error: null,
    })
  ),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadProductsByCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // New handlers for createProduct actions
  on(createProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createProductSuccess, (state, { product }) =>{
    console.log(productAdapter, product);
    return productAdapter.addOne(product, {
      ...state,
      total: state.total + 1, // Increment total count
      loading: false,
      error: null,
    })
  }
    
    
  ),
  on(createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateProductSuccess, (state, { product }) =>
    productAdapter.updateOne(
      { id: product.id, changes: product },
      {
        ...state,
        loading: false,
        error: null,
      }
    )
  ),
  on(updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
