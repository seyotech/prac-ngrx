import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  loadProductsByCategory,
  loadProductsByCategorySuccess,
  loadProductsByCategoryFailure,
} from './products.actions';
import { Product, ProductResponce, IParams } from '../../models/product.type';
import { BASE_URL } from '../../constants';
import { ProductService } from '../../services/product.services';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';
import { authStatusSuccess, checkAuthStatus } from '../auth/auth.actions';

@Injectable()
export class ProductEffects {
  // constructor(private actions$: Actions, private http: HttpClient) {}
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(({ params }) => {
        const queryParams = new URLSearchParams();
        if (params.limit !== undefined)
          queryParams.append('limit', String(params.limit));
        if (params.skip !== undefined)
          queryParams.append('skip', String(params.skip));
        if (params.sortOrder) {
          queryParams.append('sortBy', 'title');
          queryParams.append('order', params.sortOrder);
        }
        if (params.query) {
          return this.productService.searchProductsWithParams(params).pipe(
            map((res) =>
              loadProductsSuccess({ products: res.products, total: res.total })
            ),
            catchError((error) =>
              of(
                loadProductsFailure({
                  error: error.message || 'Failed to load products',
                })
              )
            )
          );
        }
        return this.productService.getProductsWithParams(params).pipe(
          map((res) =>
            loadProductsSuccess({ products: res.products, total: res.total })
          ),
          catchError((error) =>
            of(
              loadProductsFailure({
                error: error.message || 'Failed to load products',
              })
            )
          )
        );
      })
    )
  );
  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategory),
      mergeMap(({ category, params }) => {
        const queryParams = new URLSearchParams();
        if (params.limit !== undefined)
          queryParams.append('limit', String(params.limit));
        if (params.skip !== undefined)
          queryParams.append('skip', String(params.skip));
        if (params.sortOrder) {
          queryParams.append('sortBy', 'title');
          queryParams.append('order', params.sortOrder);
        }
        if (params.query) {
          return this.productService.searchProductsWithParams(params).pipe(
            map((res) =>
              loadProductsSuccess({ products: res.products, total: res.total })
            ),
            catchError((error) =>
              of(
                loadProductsFailure({
                  error: error.message || 'Failed to load products',
                })
              )
            )
          );
        }
        return this.productService.getProductsByCategoryWithParams(category, params).pipe(
          map((res) =>
            loadProductsByCategorySuccess({ products: res.products, total: res.total })
          ),
          catchError((error) =>
            of(
              loadProductsByCategoryFailure({
                error: error.message || 'Failed to load products',
              })
            )
          )
        );
      })
    )
  );

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthStatus),
      mergeMap(() =>
        this.authService.isLoggedIn().pipe(
          map((isLoggedIn) => authStatusSuccess({ isLoggedIn })),
          catchError(() => of(authStatusSuccess({ isLoggedIn: false })))
        )
      )
    )
  );
  
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      mergeMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((createdProduct) =>
            createProductSuccess({ product: createdProduct })
          ), // Pass the created product
          catchError((error) =>
            of(createProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  redirectOnAuthFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authStatusSuccess),
        tap(({ isLoggedIn }) => {
          if (!isLoggedIn) {
            this.router.navigate(['/sign-in']);
          }
        })
      ),
    { dispatch: false }
  );

  // updateProduct$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateProduct),
  //     mergeMap(({ id, updatedData }) => {
  //       const payload = { ...updatedData, id: undefined };
  //       return this.http
  //         .put<Product>(`${BASE_URL}/products/${id}`, payload, {
  //           headers: { 'Content-Type': 'application/json' },
  //         })
  //         .pipe(
  //           map((res) => updateProductSuccess({ product: res })),
  //           catchError((error) =>
  //             of(
  //               updateProductFailure({
  //                 error: error.message || 'Failed to update product',
  //               })
  //             )
  //           )
  //         );
  //     })
  //   )
  // );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap(({ id, updatedData }) =>
        this.productService.updateProductWithId(id, updatedData).pipe(
          map((product) => updateProductSuccess({ product })),
          catchError((error) =>
            of(updateProductFailure({ error: error.message || 'Failed to update product' }))
          )
        )
      )
    )
  );
}

// import { of } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import {
//   loadProducts,
//   loadProductsFailure,
//   loadProductsSuccess,
// } from './products.actions';

// import { Product } from '../../models/product.type';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { ProductService } from '../../services/product.services';

// @Injectable()
// export class ProductsEffects {
//   constructor(
//     private actionsObs: Actions,
//     private productService: ProductService
//   ) {}
//   loadProductsObs = createEffect(() =>
//     this.actionsObs.pipe(
//       ofType(loadProducts),
//       mergeMap(() =>
//         this.productService
//           .getProducts({ limit: 5, skip: 5, sortOrder: 'asc' })
//           .pipe(
//             map((products: Product[]) => loadProductsSuccess({ products })),
//             catchError((error) => of(loadProductsFailure({ error })))
//           )
//       )
//     )
//   );
// }
