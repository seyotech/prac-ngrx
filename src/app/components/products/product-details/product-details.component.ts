import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ActivatedRoute, Router } from '@angular/router';

// local imports 
import { Product } from '../../../models/product.type';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
      NzImageModule,
      CommonModule
    ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(
    private router:Router,
    private route: ActivatedRoute,
  ) {}
  id= 1;
  product!: Product;
  routeChange(){
    this.router.navigate(['/','products',this.id++])
  }
  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }

}
