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
import { ProductSearchComponent } from './product-search/product-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryService } from './category.service';
import { CustomerService } from './customer.service';
import { ProviderService } from './provider.service';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AbmProductListComponent } from './abm-product-list/abm-product-list.component';
import { ProdprovFormComponent } from './prodprov-form/prodprov-form.component';
import { AbmCustomerListComponent } from './abm-customer-list/abm-customer-list.component';
import { AbmProviderListComponent } from './abm-provider-list/abm-provider-list.component';
import { AbmCategoryListComponent } from './abm-category-list/abm-category-list.component';
import { AbmSubcategoryListComponent } from './abm-subcategory-list/abm-subcategory-list.component';
import { SubcategoryService } from './subcategory.service';
import { AbmProdprovListComponent } from './abm-prodprov-list/abm-prodprov-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductosDestacadosComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    DashboardComponent,
    ProductsPageComponent,
    CustomerFormComponent,
    AbmProductListComponent,
    ProdprovFormComponent,
    AbmCustomerListComponent,
    AbmProviderListComponent,
    AbmCategoryListComponent,
    AbmSubcategoryListComponent,
    AbmProdprovListComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule
    /*
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  providers: [ ProdProvService, CategoryService, CustomerService, ProviderService, ProductService, SubcategoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
