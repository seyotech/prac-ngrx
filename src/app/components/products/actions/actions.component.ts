import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterModule } from '@angular/router';

// local imports
import { Product } from '../../../models/product.type';
import { addToCart } from '../../../store/cart/cart.actions';
import { AuthService } from '../../../services/auth.services';
import { ProductService } from '../../../services/product.services';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'product-actions',
  standalone: true,
  imports: [NzButtonModule, RouterModule, EditProductComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  @Input('product') product!: Product;
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
  ) {}
  isLoggedIn$ = this.authService.isLoggedIn();

  private handleLoginCheck(action: () => void): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        action();
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }

  addToCart(product: Product): void {
    this.handleLoginCheck(() => {
      this.store.dispatch(addToCart({ product }));
    });
  }

  deleteProduct(id: number): void {
    this.handleLoginCheck(() => {
      this.productService.deleteProductById(id);
    });
  }
}
