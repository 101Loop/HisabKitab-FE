import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class APICallService {
  token = localStorage.getItem('TOKEN');
  headers = new HttpHeaders().set('content-type', 'application/json' ).set('Authorization', this.token );
  baseUrl = environment.baseUrl;
  data: any;
  constructor(private http: HttpClient) {}
  /* -----for login--------------------------------------------------------------------------------------- */
  login(username: string, password: string) {
    this.data = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + 'api/users/login/', this.data);
  }
  /* -----for registration--------------------------------------------------------------------------------- */
  register(userFullName: string, userOrganization: string, userEmail: string, userPassword: string, userMobile: string) {
    this.data = {
      username : userMobile,
      mobile :  userMobile,
      email : userEmail,
      name : userFullName,
      password : userPassword,
      organization: userOrganization
    };
    return this.http.post(this.baseUrl + 'api/users/register/', this.data);
  }
  /*-----login with OTP------------------------------------------------------------------------------------ */
  loginwithOTP(username: string, otp: string = null) {
    this.data = {
      value : username
    };
    if (otp != null) {this.data.otp = otp; }
    return this.http.post(this.baseUrl + 'api/users/loginotp/', this.data);
  }
  /*----------for fetching transactions-------------------------------------------------------------------------------*/
  fetchTransactions(category: string) {
    this.data = {
      category: category
    };
    return this.http.get(this.baseUrl + 'api/transactions/show/', {headers: this.headers, params: this.data});
  }
  /*-------for adding transactions ---------------------------------------------------------------------------------*/
  addTransactions(contact: string, mode: number, amount: number, category: string) {
    this.data = {
      contact: contact,
      mode: mode,
      amount: amount,
      category: category,
    };
    return this.http.post(this.baseUrl + 'api/transactions/add/', this.data, {headers: this.headers} );
  }
  /*------get payment mode-----------------------------------------------------------------------------------------*/
  getPaymentMode() {
    return this.http.get(this.baseUrl + 'api/transactions/mode/show/', {headers: this.headers});
  }
}
