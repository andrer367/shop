import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FbResponse, Product } from './interfaces';
import { enviromnet } from 'src/enviromnets/enviromnet';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type: string = '';
  cartProduct: Product[] = [];

  constructor(private http: HttpClient) { }

  create(product: Product): Observable<Product> {
    return this.http.post(`${enviromnet.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${enviromnet.fbDbUrl}/products.json`)
      .pipe(map((res: any) => {
        console.log(res)
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      }))
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${enviromnet.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
          ...res,
          id,
          data: new Date(res.date)
        }
      }))
  }

  removeById(id: string) {
    return this.http.delete(`${enviromnet.fbDbUrl}/products/${id}.json`)
  }

  updateById(product: Product) {
    return this.http.patch(`${enviromnet.fbDbUrl}/products/${product.id}.json`, product)

  }

  setType(type: string) {
    this.type = type;
  }

  addProduct(product: Product) {
    this.cartProduct.push(product);
  }
}
