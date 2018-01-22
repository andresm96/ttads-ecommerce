import { Component, OnInit, Input } from '@angular/core';
import { Subcategory } from '../models/subcategory';
import { SubcategoryService } from '../subcategory.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.css']
})
export class SubcategoryFormComponent implements OnInit {

  @Input() typeForm: any;
  @Input() subcategory: Subcategory;
  newsubcategory = { _id: ''};
  categories: Category[];

  constructor(
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  saveSubcategory() {
    this.subcategoryService.addSubcategory(this.newsubcategory as Subcategory)
    .subscribe(
      data => alert(data),
      error => alert(error)
    );
  }

  updateSubcategory(){
    this.newsubcategory._id = this.subcategory._id;
    this.subcategoryService.updateSubcategory(this.newsubcategory as Subcategory)
    .subscribe(
      data => alert(data),
      error => alert(error)
    )
  }

  deleteSubcategory(){
    this.subcategoryService.deleteSubcategory(this.subcategory)
    .subscribe(
      data => alert(data),
      error => alert(error)
    )
  }

}
