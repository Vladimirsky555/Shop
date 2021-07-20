import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../shared/order.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders = [];
  oSub: Subscription;
  rSub: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.oSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  remove(id: string) {
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }

  }
}
