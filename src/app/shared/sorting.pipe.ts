import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interfaces';

@Pipe({
  name: 'sorting'

})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type = ''): Product[] {
    if (!type.trim()) {
      return products;
    }

    return products.filter(
      (product) => product.type === type);
  }
}
