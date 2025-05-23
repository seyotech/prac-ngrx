import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../../models/product.type';

// Define the product entity state
export interface ProductState extends EntityState<Product> {
  total: number;
  loading: boolean;
  error: string | null;
}

// Create entity adapter for products
export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id, // Assuming Product has an 'id' property
});

// Initial state
export const initialProductState: ProductState = productAdapter.getInitialState({
  total: 0,
  loading: false,
  error: null,
});
export const initialState: any = {
  cart: [],
  products: [],
};

export interface ProductResponse {
  products: Product[];
  total: number;
}

export interface ProductCategories {
  name: string;
}

export interface IParams {
  limit?: number;
  skip?: number;
  sortOrder?: 'asc' | 'desc';
  query?: string;
}