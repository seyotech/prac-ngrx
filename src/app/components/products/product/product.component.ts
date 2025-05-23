import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Component, Input, OnInit } from '@angular/core';

// local imports
import { AppState } from '../../../store/app.state';
import { Product } from '../../../models/product.type';
import { ActionsComponent } from '../actions/actions.component';
import { selectCartState } from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NzCardModule, NzImageModule, CommonModule, ActionsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  count: number = 0;
  @Input('product') product!: Product;
  cartItems: Product[] = [];
  private subscriptions = new Subscription();

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(selectCartState).subscribe((cartState) => {
        this.cartItems = cartState.cartItems;
        const cartProduct = this.cartItems.find(
          (item) => item.id === this.product.id
        );
        this.count = cartProduct?.count ?? 0;
      })
    );
  }

  ngOnChanges(): void {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
