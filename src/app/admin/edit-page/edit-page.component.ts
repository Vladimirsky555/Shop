import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../../shared/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  product: Product;
  submitted = false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productService.getById(params['id']);
      })
    ).subscribe((product: Product) => {
      this.product = product;
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.productService.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Продукт был обновлён');
      this.router.navigate(['/admin', 'dashboard']);
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
