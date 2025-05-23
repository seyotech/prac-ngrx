import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../models/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();
  totalPrice$ = this.cartItemsSubject
    .asObservable()
    .pipe(
      map((items) =>
        items.reduce(
          (total, item) => total + (item?.price ?? 0) * (item.count ?? 1),
          0
        )
      )
    );
  getCartItemCount(): number {
    return this.cartItems.length;
  }
  getCountById(id: number) {
    return this.cartItems.forEach((item) => item.id === id);
  }
}
