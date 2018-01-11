import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ProdProv } from '../models/prod-prov';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() products: ProdProv[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
