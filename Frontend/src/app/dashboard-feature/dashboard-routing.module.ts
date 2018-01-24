import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AbmProductListComponent } from './../abm-product-list/abm-product-list.component';
import { AbmProdprovListComponent } from './../abm-prodprov-list/abm-prodprov-list.component';
import { AbmProviderListComponent } from './../abm-provider-list/abm-provider-list.component';
import { AbmCategoryListComponent } from './../abm-category-list/abm-category-list.component';
import { AbmSubcategoryListComponent } from './../abm-subcategory-list/abm-subcategory-list.component';
import { AbmCustomerListComponent } from './../abm-customer-list/abm-customer-list.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'products', component: AbmProductListComponent },
      { path: 'prodprovs', component: AbmProdprovListComponent },
      { path: 'providers', component: AbmProviderListComponent },
      { path: 'categories', component: AbmCategoryListComponent },
      { path: 'subcategories', component: AbmSubcategoryListComponent },
      { path: 'users', component: AbmCustomerListComponent }
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