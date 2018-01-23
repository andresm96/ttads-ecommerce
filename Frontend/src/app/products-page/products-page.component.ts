import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';
import { ProdProvService } from '../prodprov.service';
import { Product } from '../models/product';
import { ProdProv } from '../models/prod-prov';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: ProdProv[];
  categories: Category[];
  path = "/search/"
  constructor(
    private categoryService: CategoryService,
    private prodprovService: ProdProvService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.router.events.subscribe((val) =>{    
        if(val instanceof NavigationEnd){
          let id = this.route.snapshot.paramMap.get('id');
          this.getProducts(id);
        }
      })
     }

  ngOnInit() {
    this.getCategories();
    let id = this.route.snapshot.paramMap.get('id');
    this.getProducts(id);
  
   }


  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getProducts(id): void {
    this.prodprovService.getProductsBySubcategory(id).subscribe(prodprov => this.products = prodprov)
  }

  goPath(id: string){
    let newpath = this.path + id;
    this.router.navigate([newpath.toString()]);
  }
}
