import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subcategory } from '../models/subcategory';
import { SubcategoryService } from '../subcategory.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-abm-subcategory-list',
  templateUrl: './abm-subcategory-list.component.html',
  styleUrls: ['./abm-subcategory-list.component.css']
})
export class AbmSubcategoryListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  onFormActive = false;
  subcategorySelected: Subcategory;
  typeForm = 0;

  subcategories: Subcategory[] =[];

  constructor(private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ 
        orderable: false, 
        searchable: false, 
        targets: [3] 
        }]
    };
    this.getSubcategories();
  }

  getSubcategories(): void {
    this.subcategoryService.getSubcategories()
    .map(result => {
      var array = [];
      result.forEach(item => {
        var subcategory = new Subcategory();
        subcategory._id = item._id;
        subcategory.name = item.name;
        subcategory.category = item.category;
        subcategory.products = item.products;
        array.push(subcategory);
      });
      return array;
    })
    .subscribe(subcategories => {
      this.subcategories= subcategories;
      this.dtTrigger.next();
    });
  }

  newSubcategory(){
    this.onFormActive = true;
    this.typeForm = 1;
  }

  updateSubcategory(subcategory: Subcategory){
    this.subcategorySelected = subcategory;
    this.onFormActive = true;
    this.typeForm = 2;
  }

  deleteSubcategory(subcategory: Subcategory){
    this.subcategorySelected = subcategory;
    this.onFormActive = true;
    this.typeForm = 3;
  }

}
