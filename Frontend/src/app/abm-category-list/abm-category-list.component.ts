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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  categories: Category[] =[];
  category: Category;

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
        rowCallback: (row: Node, data: Category, index: number) => {
          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // (see https://github.com/l-lin/angular-datatables/issues/87)
          $('td', row).unbind('click');
          $('td', row).bind('click', () => {
            self.selectCategory(data);
          });
          return row;
        }
    };
    this.getCategories();
  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
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
    });
  }

  delete(category: Category): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.categories = this.categories.filter(c => c !== category);
      this.categoryService.deleteCategory(category).subscribe();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  selectCategory(category: Category): void {
    this.category = category;
    console.log(this.category);
  }


}
