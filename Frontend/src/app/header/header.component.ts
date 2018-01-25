import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProdProvService } from '../prodprov.service';
import { Category } from '../models/category';
import { ProdProv } from '../models/prod-prov';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[];
  prodprovs: ProdProv[];
  path = '/search/';

  constructor(private categoryService: CategoryService,
              private prodprovService: ProdProvService,
              private router : Router
             ) { }

  ngOnInit() {
    this.getCategories();
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
}
