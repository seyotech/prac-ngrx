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
import { addToCart, removeFromCart } from '../../store/cart/cart.actions';
import { CartService } from '../../services/cart.service';
import {
  selectCartState,
} from '../../store/cart/cart.selectors';
import { BillingComponent } from './billing/billing.component';
import { Subscription } from 'rxjs';

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
  private subscriptions = new Subscription();
  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(selectCartState).subscribe((cartState) => {
        this.cartItems = cartState.cartItems;
        this.cartItemCount$ = cartState.count;
        console.log('Cart state updated:', cartState);
      })
    );
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  increaseCount(product: Product): void {
    this.store.dispatch(addToCart({ product }));
  }

  decreaseCount(product: Product): void {
  this.store.dispatch(
    removeFromCart({
      product,
      decreaseOnly: !!(product.count && product.count > 1),
    })
  );
}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
