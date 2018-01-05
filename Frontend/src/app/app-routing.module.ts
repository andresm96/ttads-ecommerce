import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosDestacadosComponent } from './productos-destacados/productos-destacados.component';

const routes: Routes = [
  { path: '', redirectTo: '/destacados', pathMatch: 'full' },
  { path: 'destacados', component: ProductosDestacadosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
