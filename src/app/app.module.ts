import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import {AuthInterceptor} from './shared/auth.interceptor';
import { ProductComponent } from './shared/product/product.component';
import { SortingPipe } from './shared/sorting.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CartPagePreorderComponent } from './cart-page-preorder/cart-page-preorder.component';
import { CartPagePreorderInfoComponent } from './cart-page-preorder-info/cart-page-preorder-info.component';
import { CartPagePreorderCountInfoComponent } from './cart-page-preorder-count-info/cart-page-preorder-count-info.component';

import ruLocale from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductComponent,
    SortingPipe,
    CartPagePreorderComponent,
    CartPagePreorderInfoComponent,
    CartPagePreorderCountInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
