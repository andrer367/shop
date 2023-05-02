import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  pSub: Subscription = new Subscription();
  rSub: Subscription = new Subscription();
  productName: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  remove(id: string) {
    this.rSub = this.productService.removeById(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

}
