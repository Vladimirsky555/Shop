import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {switchMap} from 'rxjs/operators';
import {PreorderService} from '../shared/preorder.service';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product$: Observable<Product>;
  rootId: string;
  pSub: Subscription;
  emails = [];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private preorderService: PreorderService,
              private orderService: OrderService) {}

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.productService.getById(params.id);
      }));

    this.pSub = this.preorderService.getAllByRootId().subscribe(items => {
      // Получаю все элементы, чтобы отправить рассылку о снижении скидки
      if (items.length === this.preorderService.maxCount) {
        for (let i = 0; i < items.length; i++) {

          // Добавляю в массив имейлов
          this.emails.push(items[i].email);

          const order = {
            name: items[i].name,
            email: items[i].email,
            phone: items[i].phone,
            address: items[i].address,
            payment: items[i].payment + ' (дискаунт)',
            orders: items[i].orders,
            price: +items[i].orders[0].price * 0.8,
            date: new Date()
          };

          // Как только достигли числа 3, создаём 3 заказа
          this.orderService.create(order).subscribe();
        }

        this.showEmails();
        this.router.navigate(['/preordercountinfo']);
      }
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.rootId) {
        console.log('rootId: ', params.rootId);
        this.rootId = params.rootId;
        this.preorderService.setRootCustomerIdFromUrl(params.rootId);
      } else {
        this.preorderService.setRootCustomerId();
      }
    });
  }

  // Добавляем продукт просто в корзину, без предзаказа
  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

  // Устанавливаем продукт для предзаказа в предзаказ-сервис
  addSharedProduct(product: Product) {
    this.productService.setPreorderProduct(product);
    this.router.navigate(['/preordercart']);
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  showEmails() {
    for (let i = 0; i < this.emails.length; i++ ) {
      console.log(i + ' элемент: ' + this.emails[i]);
    }
  }
}
