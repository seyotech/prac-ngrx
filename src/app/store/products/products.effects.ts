import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './products.actions';

import { Product } from '../../models/product.type';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.services';

@Injectable()
export class ProductsEffects {
  constructor(
    private actionsObs: Actions,
    private productService: ProductService
  ) {}
  loadProductsObs = createEffect(() =>
    this.actionsObs.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService
          .getProducts({ limit: 5, skip: 5, sortOrder: 'asc' })
          .pipe(
            map((products: Product[]) => loadProductsSuccess({ products })),
            catchError((error) => of(loadProductsFailure({ error })))
          )
      )
    )
  );
}
