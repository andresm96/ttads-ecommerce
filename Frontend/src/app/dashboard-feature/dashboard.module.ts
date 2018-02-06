import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AbmProductListComponent } from './../abm-product-list/abm-product-list.component';
import { ProductFormComponent } from './../product-form/product-form.component';
import { AbmProdprovListComponent } from './../abm-prodprov-list/abm-prodprov-list.component';
import { ProdprovFormComponent } from './../prodprov-form/prodprov-form.component';
import { AbmProviderListComponent } from './../abm-provider-list/abm-provider-list.component';
import { ProviderFormComponent } from './../provider-form/provider-form.component';
import { AbmCategoryListComponent } from './../abm-category-list/abm-category-list.component';
import { CategoryFormComponent } from './../category-form/category-form.component';
import { AbmSubcategoryListComponent } from './../abm-subcategory-list/abm-subcategory-list.component';
import { SubcategoryFormComponent } from './../subcategory-form/subcategory-form.component';
import { AbmCustomerListComponent } from './../abm-customer-list/abm-customer-list.component';
import { CustomerFormComponent } from './../customer-form/customer-form.component';

import { CategoryService } from './../category.service';
import { SubcategoryService } from '../subcategory.service';
import { ProdProvService } from '../prodprov.service';
import { CustomerService } from '../customer.service';
import { ProviderService } from '../provider.service';
import { ProductService } from '../product.service';

import { FileUploadModule } from 'ng2-file-upload';
import { AuthenticationService } from '../guard-services/authentication.service';
import { RoleGuardService } from '../guard-services/role-guard.service';
import { AuthGuardService } from '../guard-services/auth-guard.service';
import { RolePipe } from '../pipes/role.pipe';
import { AbmOrderListComponent } from './../abm-order-list/abm-order-list.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ShipPipe } from '../pipes/ship.pipe';

@NgModule({
  imports: [
    DataTablesModule,
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    FileUploadModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    AbmProductListComponent,
    ProductFormComponent,
    AbmProdprovListComponent,
    ProdprovFormComponent,
    AbmProviderListComponent,
    ProviderFormComponent,
    AbmCategoryListComponent,
    CategoryFormComponent,
    AbmSubcategoryListComponent,
    SubcategoryFormComponent,
    AbmCustomerListComponent,
    CustomerFormComponent,
    RolePipe,
    AbmOrderListComponent,
    OrderDetailComponent,
    ShipPipe
  ],
  providers: [
    ProdProvService, 
    CategoryService, 
    CustomerService, 
    ProviderService, 
    ProductService, 
    SubcategoryService,
    RoleGuardService,
    AuthGuardService
    
  ]
})
export class DashboardModule {}
