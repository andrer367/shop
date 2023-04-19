import { Component, Input, OnInit } from '@angular/core';
import { ProductResponse } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  ngOnInit(): void {

  }

  @Input() product!: ProductResponse;

  constructor(private productService: ProductService){}

  addProduct(product: ProductResponse) {
    this.productService.addProduct(product);

  }

}
