// src/app/store/auth/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, checkAuthStatus, authStatusSuccess } from './auth.actions';
import { Router } from '@angular/router';
import { User } from '../../models/product.type';
import { BASE_URL, USER_CREDENTIALS } from '../../constants';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) => {
        console.log('ss');
        
        // Mock API call (replace with actual HttpClient call if needed)
        const user: User = { ...credentials, token: 'dummytoken' };
        localStorage.setItem(USER_CREDENTIALS, JSON.stringify(user));
        console.log('fff');
        
        return of(loginSuccess({ user }));
        // Example with real API:
        // return this.http.post<User>(`${BASE_URL}/auth/login`, credentials).pipe(
        //   map((user) => loginSuccess({ user })),
        //   catchError((error) => of(loginFailure({ error: error.message })))
        // );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        localStorage.removeItem(USER_CREDENTIALS);
        return logoutSuccess();
      })
    )
  );
  // checkAuthStatus$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(checkAuthStatus),
  //     mergeMap(() =>
  //       this.authService.isLoggedIn().pipe(
  //         map((isLoggedIn) => authStatusSuccess({ isLoggedIn })),
  //         catchError((error) => of(loginFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => this.router.navigate(['/sign-in']))
      ),
    { dispatch: false }
  );
}