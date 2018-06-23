import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApicallService} from './service/api-service/apicall.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export abstract class SharedClass implements OnInit {
  KEY_TOKEN = 'TOKEN';
  token: string;
  token_data: any;
  s_name: string;
  s_email: string;
  mode_api_results: any;
  s_mobile: string;
  i: number;
  Mid: any;
  Pmode: any;
  constructor(private APIObj: ApicallService, private router: Router) {
  }
  public isLoggedIn() {
    // console.log('Function Triggered for: ' + this.router.url);
    this.token = localStorage.getItem(this.KEY_TOKEN);
    if (this.token) {
      const jwth = new JwtHelperService();
      this.token_data = jwth.decodeToken(this.token);
      this.s_name = this.token_data.name;
      this.s_email = this.token_data.email;
      this.s_mobile = this.token_data.mobile;
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
    const url = this.router.url;
    if (this.isLoggedIn()) {
      // console.log('Welcome to Flexy Managers ' + this.name);
      switch (url) {
        case '/login': {
          this.router.navigate(['/', 'newspage']);
          break;
        }
        case '/forgetpassword': {
          this.router.navigate(['/', 'newspage']);
          break;
        }
        case '/signup': {
          this.router.navigate(['/', 'newspage']);
          break;
        }
        case '/otpverification': {
          this.router.navigate(['/', 'newspage']);
          break;
        }
        default: { break; }
      }
    } else {
      // console.log('Hey there Sneaky!');
      switch (url) {
        case '/': {break; }
        case '/login': {break; }
        case '/forgetpassword': {
          //  console.log('Its on forgetpassword');
          break; }
        case '/signup': {break; }
        case '/otpverification': {break; }
        default: {
          // console.log('Default case triggered!');
          this.router.navigate(['/', 'login']);
          break;
        }
      }
    }
  }
  getMode() {
    this.APIObj.getPaymentMode().subscribe(
      data => {
        this.mode_api_results = data['results'];
        for (this.i = 0; this.i < this.mode_api_results.length; this.i++) {
          this.Mid = this.mode_api_results[this.i].id;
          this.Pmode = this.mode_api_results[this.i].mode;
        }
      }
    );
  }
}
