import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './products.state';

// Select the product feature state
export const selectProductState = createFeatureSelector<ProductState>('products');

// Get entity selectors
const { selectAll } = productAdapter.getSelectors();

// Select all products
export const selectProducts = createSelector(selectProductState, selectAll);

// Select total products
export const selectTotal = createSelector(selectProductState, (state) => state.total);

// Select loading state
export const selectLoading = createSelector(selectProductState, (state) => state.loading);

// Select error
export const selectError = createSelector(selectProductState, (state) => state.error);