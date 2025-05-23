import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// local imports
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { selectTotalAmount } from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}
  billingForm: FormGroup = this.formBuilder.group({});
  totalAmount$: Observable<number> = this.store.select(selectTotalAmount);

  ngOnInit(): void {
    this.billingForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(6)]],
    });
    //  this.totalAmount$ = this.store.select(selectTotalAmount);
  }

  onSubmit(): void {
    if (this.billingForm.valid) {
      console.log('Billing Info:', this.billingForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
