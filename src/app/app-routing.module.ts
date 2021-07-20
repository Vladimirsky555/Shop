import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {CartPagePreorderComponent} from './cart-page-preorder/cart-page-preorder.component';
import {CartPagePreorderInfoComponent} from './cart-page-preorder-info/cart-page-preorder-info.component';
import {CartPagePreorderCountInfoComponent} from './cart-page-preorder-count-info/cart-page-preorder-count-info.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'preordercart', component: CartPagePreorderComponent},
      {path: 'preorderinfo', component: CartPagePreorderInfoComponent},
      {path: 'preordercountinfo', component: CartPagePreorderCountInfoComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
