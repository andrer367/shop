import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: Order[] = []
  pSub: Subscription = new Subscription();
  rSub: Subscription = new Subscription();
  
  constructor( private orderService : OrderService){}
  ngOnInit(): void {
      this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })
  }

  remove(order: Order) {
    this.rSub = this.orderService.removeById(order.id!).subscribe( () => {
      this.orders = this.orders.filter( (item: Order) => order.id !== item.id)
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
