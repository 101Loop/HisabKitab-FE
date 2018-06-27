import {Injectable, ɵEMPTY_ARRAY} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class APICallService {
  token = localStorage.getItem('TOKEN');
  headers = new HttpHeaders().set('content-type', 'application/json' ).set('Authorization', this.token );
  baseUrl = environment.baseUrl;
  data: any;
  message: any;
  constructor(private http: HttpClient, private toast: ToastrService) {}
  private handleError(error: HttpErrorResponse) {
    console.log('Error log: ', error);
    switch (error.status) {
      case 400: {
        if (error.error.data) {
        this.message = [error.error.data.message];
        } else {
          for (const x in error.error) {
            if (error.error.hasOwnProperty(x)) {
              this.message.push(x + ': ' + error.error[x][0]);
            }
          }
        }
        break;
      }
      case 403: {
        // TODO: Clear local storage. Redirect to loginpage
        this.message = ['You are not logged in or the token has expired. Please login again!'];
        break;
      }
      case 404: {
        this.message = [error.error.data.message];
        break;
      }
      case 422: {
        this.message = ['Improper data sent!'];
        for (const x in error.error.data) {
          if (error.error.data.hasOwnProperty(x)) {
            this.message.push(x + ': ' + error.error.data[x][0]);
          }
        }
        break;
      }
      case 500: {
        this.message = ['A server side error occurred. Please report this to info@vitartha.com'];
        break;
      }
      case 504: {
        this.message = ['Gateway timeout, Please check your internet connection!'];
        break;
      }
      case 0: {
        this.message = ['Please check your internet connection!'];
        break;
      }
      default: {
        this.message = [error.error.message];
        break;
      }
    }
    return throwError(this.message);
    /*   if (error.error instanceof ErrorEvent) {
         this.message = ['A client side error occurred: ' + error.error.message];
         console.log('Error');
       } else if (error.status >= 400 && error.status < 500) {
         switch (error.status) {
           case 403: {
             this.message = ['You are not logged in or the token has expired. Please login again!'];
             break;
           }
           default: {
             console.log(error.error);
             break;
           }
         }
       } else if (error.status >= 500) {
         this.message = ['A server side error occurred. Report this to info@vitartha.com'];
       }*/
  }
  /* -----for login--------------------------------------------------------------------------------------- */
  login(username: string, password: string) {
    this.data = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + 'api/users/login/', this.data).pipe(catchError(this.handleError));
  }
  /* -----for registration--------------------------------------------------------------------------------- */
  register(userFullName: string, userEmail: string, userPassword: string, userMobile: string) {
    this.data = {
      username : userMobile,
      mobile :  userMobile,
      email : userEmail,
      name : userFullName,
      password : userPassword
    };
    return this.http.post(this.baseUrl + 'api/users/register/', this.data).pipe(catchError(this.handleError));
  }
  /*-----login with OTP------------------------------------------------------------------------------------ */
  loginwithOTP(username: string, otp: string = null) {
    this.data = {
      value : username
    };
    if (otp != null) {this.data.otp = otp; }
    return this.http.post(this.baseUrl + 'api/users/loginotp/', this.data).pipe(catchError(this.handleError));
  }
  /*----------for fetching transactions-------------------------------------------------------------------------------*/
  fetchTransactions(category: string, /*id: string = null,*/ name: string = null) {
    this.data = {
      category: category
    };
 /*   if (id != null) {
      this.data.id = id;
    }*/
    if (name != null) {
      this.data.search = name;
    }
    return this.http.get(this.baseUrl + 'api/transactions/show/', {headers: this.headers, params: this.data})
      .pipe(catchError(this.handleError));
  }
  /*-------for adding transactions ---------------------------------------------------------------------------------*/
  addTransactions(contact: string, mode: number, amount: number, category: string, date: any) {
    this.data = {
      contact: contact,
      mode: mode,
      amount: amount,
      category: category,
      transaction_date: date
    };
    return this.http.post(this.baseUrl + 'api/transactions/add/', this.data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*------get payment mode-----------------------------------------------------------------------------------------*/
  getPaymentMode() {
    return this.http.get(this.baseUrl + 'api/transactions/mode/show/', {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
}
