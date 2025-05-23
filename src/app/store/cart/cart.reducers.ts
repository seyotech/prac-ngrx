import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../../models/product.type';
import { addToCart, removeFromCart } from './cart.actions';
import { ICart } from '../app.state';

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false,
});

export const initialState: ICart = adapter.getInitialState({
  count: 0,
});

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existingProduct = state.entities[product.id];
    let updatedCount = state.count + 1;

    if (existingProduct) {
      return adapter.updateOne(
        {
          id: product.id,
          changes: { count: (existingProduct.count ?? 0) + 1 },
        },
        { ...state, count: updatedCount }
      );
    } else {
      return adapter.addOne(
        { ...product, count: 1 },
        { ...state, count: updatedCount }
      );
    }
  }),
  on(removeFromCart, (state, { product, decreaseOnly }) => {
    const existingProduct = state.entities[product.id];
    if (!existingProduct) return state;

    let updatedCount = state.count;

    if (decreaseOnly && existingProduct.count && existingProduct.count > 1) {
      updatedCount -= 1;
      return adapter.updateOne(
        {
          id: product.id,
          changes: { count: existingProduct.count - 1 },
        },
        { ...state, count: updatedCount }
      );
    } else {
      updatedCount -= existingProduct.count ?? 1;
      return adapter.removeOne(product.id, { ...state, count: updatedCount });
    }
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();