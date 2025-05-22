import { Product } from '../models/product.type';

export interface AppState {
  cart: ICart;
  products: Product[];
}

export interface ICart {
  cartItems: Product[];
  count: number;
}
