import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosDestacadosComponent } from './productos-destacados/productos-destacados.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProdProvService } from './prodprov.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';

import { ProductSearchComponent } from './product-search/product-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryService } from './category.service';
import { CustomerService } from './customer.service';
import { ProviderService } from './provider.service';
import { SubcategoryService } from './subcategory.service';
import { ProductsPageComponent } from './products-page/products-page.component';


import { ShoppingCartService } from './shopping-cart-services/shopping-cart.service';
import { LocalStorageService, StorageService } from './shopping-cart-services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






//import { CustomerFormComponent } from './customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { AbmProductListComponent } from './abm-product-list/abm-product-list.component';
//import { ProdprovFormComponent } from './prodprov-form/prodprov-form.component';
import { FileUploadModule } from 'ng2-file-upload';
/*import { AbmCustomerListComponent } from './abm-customer-list/abm-customer-list.component';
import { AbmProviderListComponent } from './abm-provider-list/abm-provider-list.component';
import { AbmCategoryListComponent } from './abm-category-list/abm-category-list.component';
import { AbmSubcategoryListComponent } from './abm-subcategory-list/abm-subcategory-list.component';
import { AbmProdprovListComponent } from './abm-prodprov-list/abm-prodprov-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SubcategoryFormComponent } from './subcategory-form/subcategory-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';*/

import { DashboardModule } from './dashboard-feature/dashboard.module';
import { ProductModule } from './product-feature/product.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PopOverComponent } from './pop-over/pop-over.component';
import { MainComponent } from './product-feature/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    /*HeaderComponent,
    FooterComponent,
    ProductosDestacadosComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductSearchComponent,*/
    DashboardComponent
    /*ProductsPageComponent,
    CheckoutComponent,
    PopOverComponent,*/
   /* CustomerFormComponent,
    AbmProductListComponent,
    ProdprovFormComponent,
    AbmCustomerListComponent,
    AbmProviderListComponent,
    AbmCategoryListComponent,
    AbmSubcategoryListComponent,
    AbmProdprovListComponent,
    CategoryFormComponent,
    SubcategoryFormComponent,
    ProductFormComponent,
    ProviderFormComponent*/
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    ProductModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
    /*
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  providers: [ 
    ProdProvService, 
    CategoryService, 
    CustomerService, 
    ProviderService, 
    ProductService, 
    SubcategoryService,
    OrderService,
    
    LocalStorageService,
    {provide: StorageService, useClass: LocalStorageService },
    {
      deps: [StorageService, ProdProvService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
