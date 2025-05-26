import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authValidator } from '../validators/auth.validators';
import { Observable } from 'rxjs';
import {
  selectAuthError,
  selectIsLoading,
} from '../../../store/auth/auth.selectors';
import { login } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  regForm: FormGroup;
  isSubmitting$: Observable<boolean>;
  error$: Observable<string | null>;
  returnUrl: string = '/';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.regForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          authValidator.noWhiteSpace,
        ],
        authValidator.usernameExistAsync,
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.isSubmitting$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectAuthError);

    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  ngOnInit(): void {}

  signIn() {
    console.log('ddd', this.isSubmitting$, this.error$);
    
    if (this.regForm.invalid) return;

    const { userName, password } = this.regForm.value;
    this.store.dispatch(
      login({ credentials: { username: userName, password } })
    );
  }
}
