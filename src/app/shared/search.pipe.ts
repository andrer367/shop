import { Pipe, PipeTransform } from '@angular/core';
import { ProductResponse } from './interfaces';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: ProductResponse[], productName = ''): ProductResponse[]  {
    if (!productName.trim()) {
      return products;
    }

    return  products.filter(
      (product) => product.title.toLocaleLowerCase().includes(productName.trim().toLocaleLowerCase()));
  }
}
