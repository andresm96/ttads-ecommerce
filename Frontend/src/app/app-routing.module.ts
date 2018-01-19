import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosDestacadosComponent } from './productos-destacados/productos-destacados.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CustomerFormComponent } from './customer-form/customer-form.component'

const routes: Routes = [
  { path: '', redirectTo: '/destacados', pathMatch: 'full' },
  { path: 'prodprov/:id', component: ProductDetailComponent },
  { path: 'destacados', component: ProductosDestacadosComponent },
  { path: 'product', component: ProductsPageComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer-form', component: CustomerFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
