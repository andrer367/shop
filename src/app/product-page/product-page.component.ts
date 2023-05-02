import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$!: Product;
  pSub: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute

  ) { }
  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];

    this.pSub = this.productService.getById(id).subscribe((data) => this.product$ = data)
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

}
