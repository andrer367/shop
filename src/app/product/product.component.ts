import { Component, Input } from '@angular/core';
import { ProductResponse } from '../shared/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: ProductResponse;

}
