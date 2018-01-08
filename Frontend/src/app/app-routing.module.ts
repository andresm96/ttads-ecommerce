import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosDestacadosComponent } from './productos-destacados/productos-destacados.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/destacados', pathMatch: 'full' },
  { path: 'product/detail/:id', component: ProductDetailComponent },
  { path: 'destacados', component: ProductosDestacadosComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
