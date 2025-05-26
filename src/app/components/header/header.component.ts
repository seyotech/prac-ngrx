import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartComponent } from '../cart/cart.component';
import { Observable } from 'rxjs';
import { selectCurrentUser, selectIsLoggedIn } from '../../store/auth/auth.selectors';
import { checkAuthStatus, logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzMenuModule,
    CommonModule,
    NzLayoutModule,
    CartComponent,
    RouterModule,
    NzIconModule,
    NzDropDownModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  // cartItemCount$: Observable<number>;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {
    // Select state from the store
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    console.log(this.isLoggedIn$, 'lll', this.store.select(selectCurrentUser));
    
    // this.cartItemCount$ = this.store
    //   .select(selectCartItems)
    //   .pipe(map((items) => items.length));
  }

  ngOnInit(): void {
    // Dispatch action to check auth status on component initialization
    // this.store.dispatch(checkAuthStatus());

    // Dispatch action to load cart items (assuming a similar action exists)
    // this.store.dispatch(loadCartItems());
  }

  logout(): void {
    // Dispatch logout action
    this.store.dispatch(logout());
  }
}
