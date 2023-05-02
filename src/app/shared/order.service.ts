import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FbResponse, Order, Product } from './interfaces';
import { enviromnet } from 'src/enviromnets/enviromnet';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  type: string = '';
  cartProduct: Product[] = [];

  constructor(private http: HttpClient) { }

  create(order: Order): Observable<Order> {
    return this.http.post(`${enviromnet.fbDbUrl}/orders.json`, order)
      .pipe(map((res: FbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  getAll() {
    return this.http.get<Order[]>(`${enviromnet.fbDbUrl}/orders.json`)
      .pipe(map((res: any) => {
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          data: new Date(res[key].date)
        }))
      }))
  }

  removeById(id: string) {
    return this.http.delete(`${enviromnet.fbDbUrl}/orders/${id}.json`)
  }
}
