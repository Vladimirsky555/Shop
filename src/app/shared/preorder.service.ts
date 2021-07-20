import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponce } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class PreorderService {

  rootId: string;
  maxCount: number;

  constructor(private  http: HttpClient) {
    this.maxCount = 3;
  }

  create(preorder) {
    return this.http.post(`${environment.fbDbUrl}/preorders/${this.rootId}.json`, preorder)
      .pipe(map( (res: FbResponce) => {
        return {
          ...preorder,
          id: res.name,
          date: new Date(preorder.date)
        };
      }));
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/preorders.json`)
      .pipe( map ( res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  getAllByRootId() {
    return this.http.get(`${environment.fbDbUrl}/preorders/${this.rootId}.json`)
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

  // ГЕНЕРАЦИЯ ROOT-ID
  private generator(): string {
    const isString = `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;
    return isString;
  }

  private S4(): string {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  // ДОПОЛНИТЕЛЬНЫЕ МЕТОДЫ ДОСТУПА К ROOT-ID
  setRootCustomerId() {
    this.rootId = this.generator();
  }

  setRootCustomerIdFromUrl(id: string) {
    this.rootId = id;
  }

  getRootCustomerId(): string {
    return this.rootId;
  }
}
