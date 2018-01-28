import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component'; 
import { CheckoutComponent } from './../checkout/checkout.component';
import { PopOverComponent } from './../pop-over/pop-over.component'; 
import { ProductComponent } from './../product/product.component';
import { ProductDetailComponent } from './../product-detail/product-detail.component'; 
import { ProductSearchComponent } from './../product-search/product-search.component';
import { ProductsPageComponent } from './../products-page/products-page.component'; 
import { ProductosDestacadosComponent } from './../productos-destacados/productos-destacados.component';


import { LocalStorageService, StorageService } from './../shopping-cart-services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryService } from './../category.service';
import { SubcategoryService } from '../subcategory.service';
import { ProdProvService } from '../prodprov.service';
import { CustomerService } from '../customer.service';
import { ProviderService } from '../provider.service';
import { ProductService } from '../product.service';
import { ShoppingCartService } from './../shopping-cart-services/shopping-cart.service';

import { FileUploadModule } from 'ng2-file-upload';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FileUploadModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CheckoutComponent,
    PopOverComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    ProductsPageComponent,
    ProductosDestacadosComponent,
    //BrowserAnimationsModule,
    MainComponent
  ],
  providers: [
    ProdProvService, 
    CategoryService, 
    CustomerService, 
    ProviderService, 
    ProductService, 
    SubcategoryService,
    LocalStorageService,
    {provide: StorageService, useClass: LocalStorageService },
    {
      deps: [StorageService, ProdProvService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    }
  ]
})
export class ProductModule {}
