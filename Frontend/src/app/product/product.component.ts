import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ProdProvService } from '../prodprov.service';
import { ProdProv } from '../models/prod-prov';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() products: ProdProv[];

  constructor(private prodprovService: ProdProvService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl("http://localhost:3000/api/prodprov/"+url+"/image");
}

}
