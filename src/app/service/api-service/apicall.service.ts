import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
export class Login {
  constructor(public username: string, public password: string ) {}
}
export class Registration {
  constructor( public name: string,  public orgName: string, public email: string,  public password: string,  public contact: string) {}
}
export class ForgetPassword {
  constructor(public username: string) {}
}
export class VerifyOtp {
  constructor(public username: string, public otp: string) {}
}
export class GetIncomingData {
  constructor() {}
}
export  class AddIncoming {
  constructor(public date: number, public name: string, public contact: string, public amount: string,
              public mode: string, public category: string) {}
}
export class GetOutgoingData {
  constructor() {}
}
export  class AddOutgoing {
  constructor(public date: number, public name: string, public contact: string, public amount: string,
              public mode: string, public category: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  token = localStorage.getItem('TOKEN');
  headers = new HttpHeaders().set('content-type', 'application/json' ).set('Authorization', this.token );
  data: any;
  baseUrl = 'https://mtxlit6633.execute-api.ap-south-1.amazonaws.com/production/';
  constructor(private http: HttpClient) { }
  /* -----for login--------------------------------------------------------------------------------------- */
  login(logObject: Login) {
    this.data = {
      username : logObject.username,
      password : logObject.password
    };
    return this.http.post(this.baseUrl + 'api/user/login/', this.data);
  }
  /* -----for registration--------------------------------------------------------------------------------- */
  registration( regObject: Registration) {
    this.data = {
      username : regObject.contact,
      mobile :  regObject.contact,
      email : regObject.email,
      name : regObject.name,
      password : regObject.password,
      organization: regObject.orgName
    };
    return this.http.post(this.baseUrl + 'api/user/register/', this.data);
  }
  /*-----for otp sending------------------------------------------------------------------------------------ */
  forgetPassword(forgetObject: ForgetPassword) {
    this.data = {
      value : forgetObject.username
    };
    return this.http.post(this.baseUrl + 'api/user/loginotp/', this.data);
  }
  /* -------for otp varification----------------------------------------------------------------------------- */
  verifyOtp( verifyObject: VerifyOtp) {
    this.data = {
      value : verifyObject.username,
      otp: verifyObject.otp
    };
    return this.http.post(this.baseUrl + 'api/user/loginotp/', this.data);
  }
  /*----------for get incoming  data-------------------------------------------------------------------------------*/
  getIncomingData(icomingObject: GetIncomingData) {
    return this.http.get(this.baseUrl + 'api/transactions/show/', {headers: this.headers});
  }
  /*-------for add incoming ---------------------------------------------------------------------------------*/
  postIncoming(inObject: AddIncoming) {
    this.data = {
      status: '1',
      last_modified: inObject.date,
      name : inObject.name,
      contact: inObject.contact,
      mode: inObject.mode,
      amount: inObject.amount,
      category: inObject.category,
    };
    return this.http.post(this.baseUrl + 'api/transactions/add/', this.data, {headers: this.headers} );
  }
  /*----------for get outgoing data------------------------------------------------------------------------------*/
  getOutgoingData(normalObject: GetOutgoingData) {
    return this.http.get(this.baseUrl + 'api/transactions/show/', {headers: this.headers});
  }
  /*-------for add outgoing ---------------------------------------------------------------------------------*/
  postOutgoing(outObject: AddOutgoing) {
    this.data = {
      status: '1',
      last_modified: outObject.date,
      name : outObject.name,
      contact: outObject.contact,
      mode: outObject.mode,
      amount: outObject.amount,
      category: outObject.category,
    };
    return this.http.post(this.baseUrl + 'api/transactions/add/', this.data, {headers: this.headers} );
  }
}
