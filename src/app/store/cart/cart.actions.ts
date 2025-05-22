import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product.type";

export const addToCart = createAction('[Item] Add To Cart', props<Product>())
export const removeFromCart = createAction('[Item] Remove From Cart')