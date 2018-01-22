import { Component, OnInit, Input } from '@angular/core';
import { Provider } from '../models/provider';
import { ProviderService } from '../provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {

  @Input() typeForm: any;
  @Input() provider: Provider;
  newprovider = { _id: ''};
  uploadProvider = 0;

  constructor(private providerService: ProviderService) { }

  ngOnInit() {
  }

  saveProvider() {
    this.providerService.addProvider(this.newprovider as Provider)
    .subscribe(
      data => {
        alert(data);
        this.uploadProvider = 1;
        },
      error => alert(error)
    );
  }

  updateProvider(){
    this.newprovider._id = this.provider._id;
    this.providerService.updateProvider(this.newprovider as Provider)
    .subscribe(
      data => {
        alert(data);
        this.uploadProvider = 1;
        },
      error => alert(error)
    )
  }

  deleteProvider(){
    this.providerService.deleteProvider(this.provider)
    .subscribe(
      data => {
        alert(data);
        this.uploadProvider = 1;
        },
      error => alert(error)
    )
  }

  refresh(){
    location.reload();
  }

}
