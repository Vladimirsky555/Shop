import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/interfaces';
import {PreorderService} from '../shared/preorder.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-page-preorder',
  templateUrl: './cart-page-preorder.component.html',
  styleUrls: ['./cart-page-preorder.component.scss']
})
export class CartPagePreorderComponent implements OnInit {

  // переменная для соответствия массиву заказов и предзаказов. Мы будем добавлять единственный продукт
  // предзаказа в массив, так как это делается в реальном заказе. Иначе заказ не будет отображаться в
  // таблице заказов
  preordercartProducts: Product[] = [];
  preordercartProduct: Product;
  added = '';

  form: FormGroup;
  submitted = false;

  constructor(private productService: ProductService,
              private preorderService: PreorderService,
              private router: Router) { }

  ngOnInit() {
    this.preordercartProduct = this.productService.preorderProduct;
    this.preordercartProducts.push(this.preordercartProduct);

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const preorder = {
      rootId: this.preorderService.getRootCustomerId(), // Идентификатор первого покупателя
      name: this.form.value.name, // имя покупателя
      email: this.form.value.email,
      phone: this.form.value.phone, // телефон покупателя
      address: this.form.value.address, // адрес покупателя
      payment: 'card',
      orders: this.preordercartProducts, // заказ покупателя
      date: new Date() // дата предзаказа
    };

    this.preorderService.create(preorder).subscribe( res => {
      this.router.navigate(['/product', this.preordercartProduct.id], {
        queryParams: {
          rootId: this.preorderService.getRootCustomerId()
        }
      });

      this.form.reset();
      this.added = 'Предзаказ отправлен';
      this.submitted = false;
    });
  }

  delete(product: Product) {
    // this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
