import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product.type";

// export const addToCart = createAction('[Item] Add To Cart', props<Product>())
// export const removeFromCart = createAction('[Item] Remove From Cart')


export const addToCart = createAction(
  '[Products Reading List] Add to the list',
  props<{ product: Product }>()
);


export const removeFromCart = createAction(
  '[Products Reading List] Remove from list',
  props<{ productId: string }>()
);
export const decreaseCartItemCount = createAction(
  '[Cart] Decrease Item Count',
  props<{ productId: string | number }>()
);
