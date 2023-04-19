import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interfaces';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): Product[] {
    if (!productName.trim()) {
      return products;
    }

    return products.filter(
      (product) => product.title.toLocaleLowerCase().includes(productName.trim().toLocaleLowerCase()));
  }
}
