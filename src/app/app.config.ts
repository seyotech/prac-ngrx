import { provideStore } from '@ngrx/store';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { authInterceptor } from './components/auth/utils/auth.interceptors';
import { cartReducer } from './store/cart/cart.reducers';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      cart: cartReducer
    }),
    provideNzIcons(),
    provideEffects(),
    provideNzI18n(en_US),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
