import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() typeForm: any;
  @Input() category: Category;
  newcategory = new Category();
  uploadCategory = 0;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.category != null){
      this.newcategory = this.category;
    }

  }

  saveCategory() {
    this.categoryService.addCategory(this.newcategory as Category)
    .subscribe(
      data => {
        alert(data);
        this.uploadCategory = 1;
      },
      error => alert(error)
    );
  }

  updateCategory(){
    this.newcategory._id = this.category._id;
    this.categoryService.updateCategory(this.newcategory as Category)
    .subscribe(
      data => {
        alert(data);
        this.uploadCategory = 1;
      },
      error => alert(error)
    )
  }

  deleteCategory(){
    this.categoryService.deleteCategory(this.category)
    .subscribe(
      data => {
        alert(data);
        this.uploadCategory = 1;
      },
      error => alert(error)
    )
  }

  refresh(){
    location.reload();
  }

}
