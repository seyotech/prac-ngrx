import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.type';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ product: Product; decreaseOnly?: boolean }>()
);