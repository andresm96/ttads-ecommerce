import { Component, OnInit, Input } from '@angular/core';
import { ProdProv } from '../models/prod-prov';
import { Provider } from '../models/provider';
import { Product } from '../models/product';
import { ProviderService } from '../provider.service';
import { ProdProvService } from '../prodprov.service';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prodprov-form',
  templateUrl: './prodprov-form.component.html',
  styleUrls: ['./prodprov-form.component.css']
})

export class ProdprovFormComponent implements OnInit {

  @Input() typeForm: any;
  @Input() prodprov: ProdProv;
  providers : Provider[];
  products : Product[];
  newprodprov = { _id: ''}



  constructor(private providerService: ProviderService,
              private prodprovService: ProdProvService,
              private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.providerService.getProviders()
    .subscribe(providers => this.providers = providers);

    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }

}
