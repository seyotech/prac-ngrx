import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Resolve, ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

// local imports
import { Product } from '../../../models/product.type';
import { ProductService } from '../../../services/product.services';
export const productResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot
): Product | Observable<Product> | Promise<Product> => {
  const productService = inject(ProductService);
  const id = route.params['id'];
  return productService.getProduct(id);
};
// @Injectable({
//   providedIn: 'root',
// })
// export class ProductResolverService implements Resolve<Product> {
//   resolve(
//     route: ActivatedRouteSnapshot,
//   ): Product | Observable<Product> | Promise<Product> {
//     const id = route.params['id'];
//     return this.productService.getProduct(id);
//   }

//   constructor(private productService: ProductService) {}
// }
