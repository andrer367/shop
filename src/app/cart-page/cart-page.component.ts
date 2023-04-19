import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ProductResponse } from '../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartProducts: ProductResponse[] = [];
  totalPrice: number = 0;
  form!: FormGroup;
  submitted: boolean = false;
  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProduct;
    this.totalPrice = this.cartProducts.reduce((acc, { price }) => {
      return acc + Number(price);
    }, 0);
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if(this.form.invalid){
      return;
    }
    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    this.orderService.create(order)
    .subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.cartProducts.splice(0)
      this.router.navigate(['/admin', 'orders']);
    });
  }

  delete(product: ProductResponse) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
