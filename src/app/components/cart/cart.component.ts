import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

// local imports 
import { AppState } from '../../store/app.state';
import { Product } from '../../models/product.type';
import { addToCart } from '../../store/cart/cart.actions';
import { CartService } from '../../services/cart.service';
import { selectCart } from '../../store/cart/cart.selectors';
import { BillingComponent } from './billing/billing.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    NzEmptyModule,
    NzImageModule,
    NzBadgeModule,
    NzButtonModule,
    NzDrawerModule,
    BillingComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  visible = false;
  cartItems: Product[] = [];
  cartItemCount$: number = 0;
  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectCart).subscribe((cartState) => {
      this.cartItems = cartState.cartItems;
      this.cartItemCount$ = cartState.count;
    });
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  increaseCount(product: Product): void {
    this.store.dispatch(addToCart(product));
  }

  decreaseCount(product: Product): void {
    if (product.count && product.count > 1) {
      this.cartService.removeFromCart(product, true); // Decrease count if more than 1
    } else {
      this.cartService.removeFromCart(product); // Remove product completely if count reaches 0
    }
  }
}
