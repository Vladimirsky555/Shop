import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponce, Product} from './interfaces';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})

export class ProductService {

  type = 'fish1';
  cartProducts: Product[] = [];
  preorderProduct: Product;

  constructor(private http: HttpClient) { }

  create(product: Product) {
   return this.http.post(`${environment.fbDbUrl}/products.json`, product)
     .pipe(map((res: FbResponce) => {
         return {
           ...product,
           id: res.name,
           date: new Date(product.date)
         };
     }));
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
          ...res, id,
          date: new Date(res.date)
        };
      }));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
             ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  setType(type: string): void {
      this.type = type;
  }

  getType(): string {
    return this.type;
  }

  addProduct(product: Product) {
    this.cartProducts.push(product);
  }

  setPreorderProduct(product: Product) {
    this.preorderProduct = product;
  }
}
