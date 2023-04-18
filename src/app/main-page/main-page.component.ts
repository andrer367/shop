import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product, ProductResponse } from '../shared/interfaces';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products: ProductResponse[] = [];

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getAll().subscribe(
      response => { this.products = response },
      error => {
        throwError(error)
      }
    );
  }
}
