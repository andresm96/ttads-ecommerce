import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosDestacadosComponent } from './productos-destacados/productos-destacados.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/destacados', pathMatch: 'full' },
  { path: 'product/detail/:id', component: ProductDetailComponent },
  { path: 'destacados', component: ProductosDestacadosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
