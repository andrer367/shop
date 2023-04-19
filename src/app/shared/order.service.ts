import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Product, ProductResponse } from './interfaces';
import { enviromnet } from 'src/enviromnets/enviromnet';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  type: string = '';
  cartProduct: ProductResponse[] = [];

  constructor(private http: HttpClient) { }

  create(order: Order): Observable<Order> {
    return this.http.post(`${enviromnet.fbDbUrl}/orders.json`, order)
      .pipe(map((res: any) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  getAll() {
    return this.http.get<Order[]>(`${enviromnet.fbDbUrl}/orders.json`)
    .pipe(map((res: any)=> {
      return Object.keys(res).map(key => ({
        ...res[key],
        id:key,
        data: new Date(res[key].date)
      }))
    }))
  }

  // getById(id: string):Observable<ProductResponse> {
  //   return this.http.get<ProductResponse>(`${enviromnet.fbDbUrl}/products/${id}.json`)
  //     .pipe(map((res: ProductResponse) => {
  //       return {
  //         ...res,
  //         id,
  //         data: new Date(res.date)
  //       }
  //     }))
  // }

  removeById(id: string) {
    return this.http.delete(`${enviromnet.fbDbUrl}/orders/${id}.json`)
  }
}
