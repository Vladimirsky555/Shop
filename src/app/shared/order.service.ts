import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FbResponce, Product} from './interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Информация, извлекаемая из массива для передачи админу
  info = '';

  constructor(private  http: HttpClient) { }

  create(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map( (res: FbResponce) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        };
      }));
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
    .pipe( map ( res => {
      return Object.keys(res)
      .map( key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }));
    }));
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }

  // getById(id: string) {
  //   return this.http.get(`${environment.fbDbUrl}/orders/${id}.json`)
  //     .pipe(map(res => {
  //       return {
  //         ...res, id,
  //         date: new Date()
  //       };
  //     }));
  // }

  sendEmailToAdmin(order, products) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    for (let i = 0; i < products.length; i++) {
       this.info += products[i].title + ' - ' + products[i].price + ', ';
       console.log(this.info);
    }

    this.http.post('https://formspree.io/f/xwkaowgv',
      {
        name: order.name,
        replyto: order.email,
        phone: order.phone,
        address: order.address,
        payment: order.payment,
        price: order.price + ' руб',
        date: order.date,
        info: this.info
      },
      { headers }).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
