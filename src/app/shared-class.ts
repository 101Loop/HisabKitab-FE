import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import {APICallService} from './service/api-service/apicall.service';


export abstract class SharedClass implements OnInit {
  KEY_TOKEN = 'TOKEN';
  isToken: boolean;
  token: string;
  token_data: any;
  s_name: string;
  s_email: string;
  mode_api_results: any;
  s_mobile: string;
  i: number;
  Mid: any;
  Pmode: any;
  response: any;
  category_c = 'C';
  category: string;
  protected constructor(private router: Router) {}
  public isLoggedIn() {
    this.token = localStorage.getItem(this.KEY_TOKEN);
    if (this.token) {
      const jwth = new JwtHelperService();
      this.token_data = jwth.decodeToken(this.token);
      this.s_name = this.token_data.name;
      this.s_email = this.token_data.email;
      this.s_mobile = this.token_data.mobile;
      this.isToken = true;
      return true;
    } else {
      this.isToken = false;
      return false;
    }
  }
  ngOnInit() {
    // TODO: Implement Promise returned by each navigate
    const url = this.router.url;
    if (this.isLoggedIn()) {
      switch (url) {
        // case '/': {
        //   this.router.navigate(['/', 'dashboard']);
        //   break;
        // }
        // case '/home': {
        //   this.router.navigate(['/', 'dashboard']);
        //   break;
        // }
        case '/login': {
          this.router.navigate(['/', 'dashboard']);
          break;
        }
        case '/forgetpassword': {
          this.router.navigate(['/', 'dashboard']);
          break;
        }
        case '/signup': {
          this.router.navigate(['/', 'dashboard']);
          break;
        }
        case '/otpverification': {
          this.router.navigate(['/', 'dashboard']);
          break;
        }
        default: { break; }
      }
    } else {
      switch (url) {
        case '/': {break; }
        case '/home': {break; }
        case '/login': {break; }
        case '/forgetpassword': {
          break; }
        case '/signup': {break; }
        case '/otpverification': {break; }
        default: {
          this.router.navigate(['/', 'home']);
          break;
        }
      }
    }
  }
  getMode(APIObj: APICallService) {
    APIObj.getPaymentMode().subscribe(
      data => {
        this.mode_api_results = data['results'];
        for (this.i = 0; this.i < this.mode_api_results.length; this.i++) {
          this.Mid = this.mode_api_results[this.i].id;
          this.Pmode = this.mode_api_results[this.i].mode;
        }
      }
    );
  }
  getSearch(APIObj: APICallService) {
    APIObj.fetchTransactions(this.category).subscribe(
      data => {
      }
    );
  }
}
