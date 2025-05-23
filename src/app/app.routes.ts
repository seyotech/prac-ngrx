import { Routes } from '@angular/router';

// local imports 
import { AppComponent } from './app.component';
import { authGuard } from './components/auth/utils/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { ProductsComponent } from './components/products/products/products.component';
import { productResolver } from './components/products/product-details/product-resolver';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: ProductsComponent },
          {
            path: 'products/:id', 
            component: ProductDetailsComponent,
            canActivate: [authGuard],
            resolve: {
              product: productResolver
            }, 
          },
        ]
      },
    ],
  },

];
