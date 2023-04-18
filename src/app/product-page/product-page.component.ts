import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductResponse } from '../shared/interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$! : ProductResponse;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute

  ) {}
  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
 
    this.productService.getbyId(id).subscribe((data) => this.product$ = data)
  }

}
