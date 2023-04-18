import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ProductResponse } from '../shared/interfaces';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products: ProductResponse[] = [];
  pSub: Subscription = new Subscription();


  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.pSub=this.productService.getAll().subscribe(
      response => { this.products = response },
      error => {
        throwError(error)
      }
    );
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
