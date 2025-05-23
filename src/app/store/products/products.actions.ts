
import { createAction, props } from '@ngrx/store';
import { Product, IParams } from '../../models/product.type';

// Load products
export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ params: IParams }>()
);
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[]; total: number }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);
// load products by category
export const loadProductsByCategory = createAction(
  '[Products] Load Products by category',
  props<{ category: string, params: IParams }>()
);
export const loadProductsByCategorySuccess = createAction(
  '[Products] Load Products by category Success',
  props<{ products: Product[]; total: number }>()
);
export const loadProductsByCategoryFailure = createAction(
  '[Products] Load Products by category Failure',
  props<{ error: string }>()
);

// Create product
export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);
export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Product }>() // Added product payload
);
export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: string }>()
);

// Update product
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ id: number; updatedData: Partial<Product> }>()
);
export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: string }>()
);




export const showModal = createAction('[Product Modal] Show Modal');
export const hideModal = createAction('[Product Modal] Hide Modal');