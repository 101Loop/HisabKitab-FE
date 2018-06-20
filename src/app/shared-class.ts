import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApicallService} from './service/api-service/apicall.service';
import {JwtHelper} from 'angular2-jwt';

export abstract class SharedClass implements OnInit {
  KEY_TOKEN = 'TOKEN';
  token: string;
  token_data: any;
  s_name = 'Dinesh' ;
  s_email = 'dinesh@gmail.com';
  s_mobile = '8505825849';
  constructor(private APIObj: ApicallService, private router: Router) {}
  public isLoggedIn() {
    // console.log('Function Triggered for: ' + this.router.url);
    this.token = localStorage.getItem(this.KEY_TOKEN);
    if (this.token) {
      const jwth = new JwtHelper();
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
}
