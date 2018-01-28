import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductosDestacadosComponent } from '../productos-destacados/productos-destacados.component';
import { MainComponent } from './main/main.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsPageComponent } from '../products-page/products-page.component';
import { CheckoutComponent } from '../checkout/checkout.component';

const productRoutes: Routes = [
  { path: '', redirectTo: '/destacados', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'destacados', component: ProductosDestacadosComponent },
      { path: 'prodprov/:id', component: ProductDetailComponent },
      { path: 'search/:id', component: ProductsPageComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
