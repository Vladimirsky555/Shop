import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  remove(id: string) {
    this.dSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
