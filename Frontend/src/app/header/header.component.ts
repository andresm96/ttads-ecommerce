import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProdProvService } from '../prodprov.service';
import { Category } from '../models/category';
import { ProdProv } from '../models/prod-prov';
import { Router } from '@angular/router';

import { ShoppingCart } from "../models/shopping-cart";
import { ShoppingCartService } from "../shopping-cart-services/shopping-cart.service";
import { CartItem } from "../models/cart-item";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { AuthenticationService } from '../guard-services/authentication.service';
import { StorageService } from '../shopping-cart-services/storage.service';

interface ICartItemWithProduct extends CartItem {
  prodprov: ProdProv;
  totalCost: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;
  categories: Category[];
  prodprovs: ProdProv[];
  path = '/search/';
  numberItems = 0;
  login: boolean = false;
  admin: boolean = false;
  localStorage: Storage;

  constructor(private categoryService: CategoryService,
              private prodprovService: ProdProvService,
              private shoppingCartService: ShoppingCartService,
              private router : Router,
              private storageService: StorageService,
              private authService: AuthenticationService
             ) { 
              this.localStorage = this.storageService.get();
             }

  ngOnInit() {
    if(this.localStorage.getItem('token')){
      this.login = true;
    } else {
      this.login = false;
    }
    this.admin = this.authService.isAdmin();
    this.getCategories();

    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.numberItems = cart.items.length;
    })
  }
  
  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  searchBySubcategory(id:string){
    console.log(id);
    this.prodprovService.getProductsBySubcategory(id).subscribe(prodprovs => this.prodprovs = prodprovs);
  }

  goPath(id: string){
    let newpath = this.path + id;
    this.router.navigate([newpath.toString()]);
  }

  logout(): void {
    this.authService.logout();
    location.reload();
  }
}
