import { Component, Input } from '@angular/core';
import {Product} from '../interfaces';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  @Input() product: Product;


  constructor(private productService: ProductService) {}

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }
}
