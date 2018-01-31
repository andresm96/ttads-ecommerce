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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';


import { DashboardModule } from './dashboard-feature/dashboard.module';
import { ProductModule } from './product-feature/product.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PopOverComponent } from './pop-over/pop-over.component';
import { MainComponent } from './product-feature/main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './guard-services/authentication.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './guard-services/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UnauthorizedComponent,
    ForbiddenComponent,

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
    AuthenticationService,
    LocalStorageService,
    {provide: StorageService, useClass: LocalStorageService },
    {
      deps: [StorageService, ProdProvService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
