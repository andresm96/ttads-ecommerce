import { Component, OnInit } from '@angular/core';
import { ProdProvService } from '../prodprov.service';
import { Product } from '../models/product';
import { ProdProv } from '../models/prod-prov';


@Component({
  selector: 'app-productos-destacados',
  templateUrl: './productos-destacados.component.html',
  styleUrls: ['./productos-destacados.component.css']
})
export class ProductosDestacadosComponent implements OnInit {
  title = 'Productos destacados';

  products: ProdProv[];

  constructor(private prodprovService: ProdProvService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.prodprovService.getHighlights().subscribe(products => this.products = products);
  }
}
