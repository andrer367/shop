import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductResponse } from './interfaces';
import { enviromnet } from 'src/enviromnets/enviromnet';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type: string = '';

  constructor(private http: HttpClient) { }

  create(product: Product): Observable<ProductResponse> {
    return this.http.post(`${enviromnet.fbDbUrl}/products.json`, product)
      .pipe(map((res: any) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll() {
    return this.http.get<ProductResponse[]>(`${enviromnet.fbDbUrl}/products.json`)
    .pipe(map((res: any)=> {
      return Object.keys(res).map(key => ({
        ...res[key],
        id:key,
        data: new Date(res[key].date)
      }))
    }))
  }

  getById(id: string):Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${enviromnet.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: ProductResponse) => {
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

  updateById(product: ProductResponse){
    return this.http.patch(`${enviromnet.fbDbUrl}/products/${product.id}.json`, product)

  }

  setType(type: string) {
    this.type = type;
  }
}
