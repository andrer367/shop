import { Pipe, PipeTransform } from '@angular/core';
import { ProductResponse } from './interfaces';

@Pipe({
  name: 'sorting'
 
})
export class SortingPipe implements PipeTransform {

  transform(products: ProductResponse[], type = ''): ProductResponse[] {
    if (!type.trim()) {
      return products;
    }

    return products.filter(
      (product) => product.type=== type);
  }
}
