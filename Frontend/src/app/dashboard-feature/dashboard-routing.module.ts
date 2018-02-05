import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AbmProductListComponent } from './../abm-product-list/abm-product-list.component';
import { AbmProdprovListComponent } from './../abm-prodprov-list/abm-prodprov-list.component';
import { AbmProviderListComponent } from './../abm-provider-list/abm-provider-list.component';
import { AbmCategoryListComponent } from './../abm-category-list/abm-category-list.component';
import { AbmSubcategoryListComponent } from './../abm-subcategory-list/abm-subcategory-list.component';
import { AbmCustomerListComponent } from './../abm-customer-list/abm-customer-list.component';

import { AuthGuardService as AuthGuard } from './../guard-services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './../guard-services/role-guard.service';
import { AbmOrderListComponent } from '../abm-order-list/abm-order-list.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'admin'
    } ,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full'},
      { path: 'products', component: AbmProductListComponent },
      { path: 'prodprovs', component: AbmProdprovListComponent },
      { path: 'providers', component: AbmProviderListComponent },
      { path: 'categories', component: AbmCategoryListComponent },
      { path: 'subcategories', component: AbmSubcategoryListComponent },
      { path: 'users', component: AbmCustomerListComponent },
      { path: 'orders', component: AbmOrderListComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }