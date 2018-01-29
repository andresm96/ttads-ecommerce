import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-abm-category-list',
  templateUrl: './abm-category-list.component.html',
  styleUrls: ['./abm-category-list.component.css']
})
export class AbmCategoryListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  categories: Category[] =[];
  category: Category;

  onFormActive = false;
  typeForm = 0;
  categorySelected: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ 
        orderable: false, 
        searchable: false, 
        targets: [2] 
        }],
        responsive: true
    };
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var category = new Category();
        category._id = item._id;
        category.name = item.name;
        category.subcategory = item.subcategory;
        array.push(category);
      });
      return array;
    })
    .subscribe(categories => {
      this.categories = categories;
      this.dtTrigger.next();
    });
  }

  newCategory(){
    this.onFormActive = true;
    this.typeForm = 1;
  }

  updateCategory(category: Category){
    this.categorySelected = category;
    this.onFormActive = true;
    this.typeForm = 2;
  }

  deleteCategory(category: Category){
    this.categorySelected = category;
    this.onFormActive = true;
    this.typeForm = 3;
  }


}
