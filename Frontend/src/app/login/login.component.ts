import { Component, OnInit } from '@angular/core';
import { Credential } from '../models/credential';
import { Router } from '@angular/router';
import { StorageService } from "./../shopping-cart-services/storage.service";
import { AuthenticationService } from '../guard-services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = new Credential();
  success: boolean = true;
  message: string;
  status: number;


  constructor(
    private authService: AuthenticationService,
    private router: Router
    
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.credentials as Credential)
    .subscribe( res => {
       alert(res);
       if(res){
         this.router.navigate(['/destacados']);
       }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  save(token: string): void{
    this.authService.save(token);
  }

}
