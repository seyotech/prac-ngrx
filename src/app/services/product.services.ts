import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product, ProductCategories, IParams } from '../models/product.type';
import { BASE_URL } from '../constants';
import {
  loadProducts,
  loadProductsByCategory,
  updateProduct,
} from '../store/products/products.actions';
import { ProductResponse } from '../store/products/products.state';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_ENDPOINT = BASE_URL;

  constructor(private http: HttpClient, private store: Store) {}

  getProducts(params: IParams): void {
    this.store.dispatch(loadProducts({ params }));
  }

  getProductsWithParams(params: IParams): Observable<ProductResponse> {
    const queryParams = new URLSearchParams();
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.skip !== undefined) queryParams.append('skip', String(params.skip));
    if (params.sortOrder) {
      queryParams.append('sortBy', 'title');
      queryParams.append('order', params.sortOrder);
    }
    return this.http.get<ProductResponse>(`${this.API_ENDPOINT}/products?${queryParams.toString()}`);
  }
  getProductsByCategoryWithParams(category: string, params: IParams): Observable<ProductResponse> {
    const queryParams = new URLSearchParams();
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.skip !== undefined) queryParams.append('skip', String(params.skip));
    if (params.sortOrder) {
      queryParams.append('sortBy', 'title');
      queryParams.append('order', params.sortOrder);
    }
    return this.http.get<ProductResponse>(`${this.API_ENDPOINT}/products/category/${category}?${queryParams.toString()}`);
  }
  searchProductsWithParams(params: IParams): Observable<ProductResponse> {
    const queryParams = new URLSearchParams();
    if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
    if (params.skip !== undefined) queryParams.append('skip', String(params.skip));
    if (params.sortOrder) {
      queryParams.append('sortBy', 'title');
      queryParams.append('order', params.sortOrder);
    }
    return this.http.get<ProductResponse>(
      `${this.API_ENDPOINT}/products/search?q=${params.query}&${queryParams.toString()}`
    );
  }

  searchProducts(params: IParams): void {
    this.store.dispatch(loadProducts({ params }));
  }

  getProductsByCategory(category: string, params: IParams): void {
    this.store.dispatch(loadProductsByCategory({ category, params }));
  }
  // getProductsByCategory(category: string): Observable<Product[]> {
  //   return this.http
  //     .get<{ products: Product[] }>(
  //       `${this.API_ENDPOINT}/products/category/${category}`
  //     )
  //     .pipe(map((res: any) => res.products));
  // }

  updateProduct(id: number, updatedData: Partial<Product>): void {
    this.store.dispatch(updateProduct({ id, updatedData }));
  }
  updateProductWithId(
    id: number,
    updatedData: Partial<Product>
  ): Observable<Product> {
    const payload = { ...updatedData, id: undefined };
    return this.http.put<Product>(
      `${this.API_ENDPOINT}/products/${id}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  categories(): Observable<ProductCategories[]> {
    return this.http.get<ProductCategories[]>(
      `${this.API_ENDPOINT}/products/categories`
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.API_ENDPOINT}/products/add`,
      product,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
 
 deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_ENDPOINT}/products/${id}`);
  }

  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`${this.API_ENDPOINT}/products/${id}`);
  }
}
// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { BehaviorSubject, catchError, map, Observable } from "rxjs";
// import { IParams, Product, ProductCategories, ProductResponce } from "../models/product.type";

// import { BASE_URL } from "../constants";
// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   private readonly API_ENDPOINT = BASE_URL;
//   private productsSubject = new BehaviorSubject<Product[]>([]);
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   private totalSubject = new BehaviorSubject<number>(0);
//   total$ = this.totalSubject.asObservable();

//   products$ = this.productsSubject.asObservable();
//   isLoading$ = this.loadingSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   getProducts({ limit, skip, sortOrder }: IParams): Observable<Product[]> {
//     this.loadingSubject.next(true);

//     const queryParams = new URLSearchParams();
//     if (limit !== undefined) queryParams.append('limit', String(limit));
//     if (skip !== undefined) queryParams.append('skip', String(skip));
//     if (sortOrder) queryParams.append('sortBy', 'title');
//     if (sortOrder) queryParams.append('order', sortOrder);

//     this.http
//       .get<ProductResponce>(`${this.API_ENDPOINT}/products?${queryParams.toString()}`)
//       .subscribe((res) => {
//         this.productsSubject.next(res.products);
//         this.totalSubject.next(res.total)
//         this.loadingSubject.next(false);
//       });
//       return this.products$;
//     // this.http
//     //   .get<ProductResponce>(`${this.API_ENDPOINT}/products?${queryParams.toString()}`)
//     //   .subscribe((res) => {
//     //     this.productsSubject.next(res.products);
//     //     this.totalSubject.next(res.total)
//     //     this.loadingSubject.next(false);
//     //   });
//   }

//   updateProduct(id: number, updatedData: Partial<Product>) {
//     const products = this.productsSubject.getValue();
//     const nextProduct = products.find((product) => product.id === id);
//     const payload = { ...updatedData, id: undefined };
//     if (nextProduct) {
//       this.http
//         .put(`${this.API_ENDPOINT}/products/${id}`, payload, {
//           headers: { 'Content-Type': 'application/json' },
//         })
//         .subscribe({
//           next: (res) => {
//             const updatedProductFromApi: Product = {
//               ...nextProduct,
//               ...res,
//             };
//             const newProducts = products.map((product) =>
//               product.id === id ? updatedProductFromApi : product
//             );
//             this.productsSubject.next(newProducts);
//           },
//           error: (err: unknown) => {
//             console.error('Failed to update product:', err);
//           },
//         });
//     } else {
//       console.error(`Product with id: ${id} not found`);
//     }
//   }
//   // Search products
//   searchProducts({ query, limit, skip, sortOrder }: IParams): Observable<Product[]> {
//     this.loadingSubject.next(true);
//     return this.http
//       .get<ProductResponce>(
//         `${this.API_ENDPOINT}/products/search?q=${query}&limit=${limit}&skip=${skip}&sortBy=title&order=${sortOrder}`
//       )
//       .pipe(
//         map((res) => res.products),
//         catchError((error) => {
//           this.loadingSubject.next(false);
//           throw error;
//         }),
//         map((products) => {
//           this.productsSubject.next(products);
//           this.loadingSubject.next(false);
//           return products;
//         })
//       );
//   }

//   // Get products by category
//   getProductsByCategory(category: string): Observable<Product[]> {
//     this.loadingSubject.next(true);
//     return this.http
//       .get<{ products: Product[] }>(`${this.API_ENDPOINT}/products/category/${category}`)
//       .pipe(
//         map((res:any) => res.products),
//         catchError((error) => {
//           this.loadingSubject.next(false);
//           throw error;
//         }),
//         map((products) => {
//           this.productsSubject.next(products);
//           this.loadingSubject.next(false);
//           return products;
//         })
//       );
//   }
//   categories(): Observable<ProductCategories[]> {
//     return this.http.get<ProductCategories[]>(
//       `${this.API_ENDPOINT}/products/categories`
//     );
//   }
//   // Load more products (load more behavior is similar to `getProducts`)
//   loadMore({ limit, skip, sortOrder }: IParams): void {
//     this.getProducts({ limit, skip, sortOrder });
//   }
//     // Create a new product
//   createProduct(product: Product) {
//     this.http.post<Product>(`${this.API_ENDPOINT}/products/add`, product, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     this.productsSubject.next([product, ...this.productsSubject.getValue()]);
//   }
//     deleteProductById(id: number) {
//     this.productsSubject.next(
//       this.productsSubject.getValue().filter((product) => product.id !== id)
//     );
//   }
//   getProduct(id: number | string): Observable<Product> {
//         return this.http.get<Product>(`${this.API_ENDPOINT}/products/${id}`);
//       }
// }
