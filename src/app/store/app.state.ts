import { Product } from '../models/product.type';
import { EntityState } from '@ngrx/entity';

export interface AppState {
  cart: ICart;
  products: Product[];
}

export interface ICart extends EntityState<Product> {
  count: number;
}
