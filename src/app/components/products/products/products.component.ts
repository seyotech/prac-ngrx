import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { IParams, Product } from '../../../models/product.type';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../../services/product.services';
import { TopbarComponent } from '../../topbar/topbar/topbar.component';
import { CategoryStateService } from '../../../services/category-state.service';
import {
  selectProducts,
  selectTotal,
  selectLoading,
} from '../../../store/products/products.selectors';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    TopbarComponent,
    ProductComponent,
    NzPaginationModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  search: string = '';
  products: Product[] = [];
  limit = 5;
  skip = 0;
  sortOrder: 'asc' | 'desc' = 'asc';
  totalProducts = 0;
  currentPage = 1;
  category: string = '';
  private destroy$ = new Subject<void>();

  products$ = this.store.select(selectProducts);
  loading$ = this.store.select(selectLoading);
  total$ = this.store.select(selectTotal);

  constructor(
    private productService: ProductService,
    private categoryState: CategoryStateService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.total$.pipe(takeUntil(this.destroy$)).subscribe((total) => {
      this.totalProducts = total;
    });
    this.products$.pipe(takeUntil(this.destroy$)).subscribe((products) => {
      console.log({ product: products });

      this.products = products;
    });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.search = params.get('search') || '';
        this.sortOrder = (params.get('order') as 'asc' | 'desc') || 'asc';
        this.limit = Number(params.get('limit')) || 5;
        this.skip = Number(params.get('skip')) || 0;
        if (this.search) {
          this.productService.searchProducts(
            this.buildParams({ query: this.search })
          );
        } else {
          this.fetchBySelectedCategory();
        }
      });
    this.fetchBySelectedCategory();
  }

  loadMore() {
    this.skip += this.limit;
    if (this.search) {
      this.productService.searchProducts(
        this.buildParams({ query: this.search })
      );
    } else {
      this.productService.getProducts(this.buildParams());
    }
  }

  private buildParams(extraParams?: Partial<IParams>): IParams {
    return {
      limit: this.limit,
      skip: this.skip,
      sortOrder: this.sortOrder,
      ...extraParams,
    };
  }

  private fetchBySelectedCategory() {
    this.categoryState.selectedCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        if (category === 'all') {
          this.productService.getProducts(this.buildParams());
        } else {
          this.category = category;
          this.productService.getProductsByCategory(
            category,
            this.buildParams()
          );
        }
      });
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.skip = (page - 1) * this.limit;
    if (this.search) {
      this.productService.searchProducts(
        this.buildParams({ query: this.search })
      );
    } else if (this.category) {
      this.productService.getProductsByCategory(
        this.category,
        this.buildParams()
      );
    } else {
      this.productService.getProducts(this.buildParams());
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import { AsyncPipe, CommonModule } from '@angular/common';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { NzPaginationModule } from 'ng-zorro-antd/pagination';

// // local imports
// import { IParams, Product } from '../../../models/product.type';
// import { ProductComponent } from '../product/product.component';
// import { ProductService } from '../../../services/product.services';
// import { TopbarComponent } from '../../topbar/topbar/topbar.component';
// import { CategoryStateService } from '../../../services/category-state.service';
// import { Store } from '@ngrx/store';
// import { loadProducts } from '../../../store/products/products.actions';
// import { selectProducts } from '../../../store/products/products.selectors';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [
//     AsyncPipe,
//     CommonModule,
//     TopbarComponent,
//     ProductComponent,
//     NzPaginationModule,
//   ],
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css'],
// })
// export class ProductsComponent implements OnInit, OnDestroy {
//   search: string = '';
//   products: Product[] = [];
//   limit = 5;
//   skip = 0;
//   sortOrder: 'asc' | 'desc' = 'asc';
//   totalProducts = 0;
//   currentPage = 1;
//   private destroy$ = new Subject<void>(); // To clean up subscriptions

//   products$ = this.productService.products$;
//   loading$ = this.productService.isLoading$;

//   constructor(
//     private productService: ProductService,
//     private categoryState: CategoryStateService,
//     private route: ActivatedRoute,
//     private store: Store
//   ) {}

//   ngOnInit() {
//     this.productService.total$.subscribe((total) => {
//       this.totalProducts = total;
//     });
//     // this.store.dispatch(loadProducts())
//     // this.store.select(selectProducts).subscribe((res)=>{
//     //   this.products = res;
//     // });
//     this.route.queryParamMap.subscribe((params) => {
//       this.search = params.get('search') || '';
//       this.sortOrder = (params.get('order') as 'asc' | 'desc') || 'asc';
//       this.limit = Number(params.get('limit')) || 5;
//       this.skip = Number(params.get('skip')) || 0;

//       if (this.search) {
//         this.productService
//           .searchProducts(this.buildParams({ query: this.search }))
//           .subscribe((products) => (this.products = products));
//       } else {
//         this.fetchBySelectedCategory();
//       }
//     });

//     this.fetchBySelectedCategory();
//   }

//   // Handle load more logic with category or search-based conditions
//   loadMore() {
//     this.skip += this.limit;

//     if (this.search) {
//       this.productService
//         .searchProducts(this.buildParams({ query: this.search }))
//         .subscribe();
//     } else {
//       this.productService.getProducts(this.buildParams());
//     }
//   }

//   // Build query params for fetching products
//   private buildParams(extraParams?: Partial<IParams>) {
//     return {
//       limit: this.limit,
//       skip: this.skip,
//       sortOrder: this.sortOrder,
//       ...extraParams,
//     };
//   }

//   // Fetch products based on selected category
//   private fetchBySelectedCategory() {
//     this.categoryState.selectedCategory$
//       .pipe(takeUntil(this.destroy$)) // Ensure we unsubscribe when the component is destroyed
//       .subscribe((category) => {
//         if (category === 'all') {
//           this.productService.getProducts(this.buildParams());
//         } else {
//           this.getProductsByCategory(category);
//         }
//       });
//   }

//   private getProductsByCategory(category: string) {
//     this.productService
//       .getProductsByCategory(category)
//       .subscribe((products) => (this.products = products));
//   }
//   get totalPages(): number {
//     return Math.ceil(this.totalProducts / this.limit);
//   }

//   get pages(): number[] {
//     return Array.from({ length: this.totalPages }, (_, i) => i + 1);
//   }

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.skip = (page - 1) * this.limit;

//     if (this.search) {
//       this.productService
//         .searchProducts({
//           query: this.search,
//           ...this.buildParams(),
//         })
//         .subscribe();
//     } else {
//       this.productService.getProducts(this.buildParams());
//     }
//   }

//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
// }
