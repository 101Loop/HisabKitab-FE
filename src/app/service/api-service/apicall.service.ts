import {Injectable, ɵEMPTY_ARRAY} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class APICallService {
  token = localStorage.getItem('TOKEN');
  headers = new HttpHeaders().set('content-type', 'application/json' ).set('Authorization', this.token );
  // baseUrl = environment.baseUrl;
  baseUrl = 'https://y5sa0ot8y4.execute-api.ap-south-1.amazonaws.com/production/';
  data: any;
  message: any;
  constructor(private http: HttpClient, private rtr: Router) {}
  private handleError(error: HttpErrorResponse) {
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
      case 429: {
        this.message = ['Too many request'];
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
        this.message = [error.error];
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
  /*------for change password-----------------------------------------------------------------------------------------*/
  changePassword(newPassword: string) {
    this.data = {
      new_password: newPassword,
    };
    return this.http.put(this.baseUrl + 'api/users/changepassword/', this.data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*--------for update profile---------------------------------------------------------------------------------------*/
  updateProfile(name: string, mobile: string, email: string) {
    this.data = {
      name: name,
      mobile: mobile,
      email: email
    };
    // console.log(this.data);
    return this.http.put(this.baseUrl + 'api/users/updateprofile/', this.data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*----------for fetching transactions-------------------------------------------------------------------------------*/
  fetchTransactions(data: any) {
   // console.log(data);
    return this.http.get(this.baseUrl + 'api/transactions/show/', {headers: this.headers, params: data})
      .pipe(catchError(this.handleError));
  }
  /*-------for adding transactions ---------------------------------------------------------------------------------*/
  addTransactions(contact: string, mode: number, amount: number, category: string, comments: any,  date: any) {
    this.data = {
      contact: contact,
      mode: mode,
      amount: amount,
      category: category,
      comments: comments,
      transaction_date: date
    };
    return this.http.post(this.baseUrl + 'api/transactions/add/', this.data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*-------for update transactions ---------------------------------------------------------------------------------*/
  updatePost(id: string, name: string, amount: string, comment: string, date: any, modeId: any) {
    this.data = {
      contact: name,
      amount: amount,
      comments: comment,
      transaction_date: date,
      mode: modeId,
    };
    return this.http.put(this.baseUrl + 'api/transactions/' + id + '/update/', this.data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*-------for delete transactions ---------------------------------------------------------------------------------*/
  deletePost(id: string) {
    return this.http.delete(this.baseUrl + 'api/transactions/' + id + '/delete/', {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*------get payment mode-----------------------------------------------------------------------------------------*/
  getPaymentMode() {
    return this.http.get(this.baseUrl + 'api/transactions/mode/show/', {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  /*-------for adding  feeds ---------------------------------------------------------------------------------*/
  sendFeed(name: string, mobile: string, email: string, feeds: string) {
    this.data = {
      name: name,
      mobile: mobile,
      email: email,
      message: feeds
    };
    return this.http.post(this.baseUrl + 'api/feedback/', this.data, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
/*---------To push notification-------------------------------------------------------------------------------*/
  FCMnotification(fcmtoken: string) {
    const key = 'key=AAAA65_MspE:APA91bEng9AtI2zz2ba5hmBMBUbZ_NDDjGrLWnIzk8oLcEthalLmEl3Sa3PKOm0q' +
      '2HP9i9txLir817bTQYgCQ3uQDhwrY81K2pTAO74fa41V6foeHaI2QoOO6J7AXw92zYxw74jvcYWPQqriVLeQnFw9KDVmUU_8Jw';
    this.headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', key);

    this.data = {
      to : fcmtoken,
      notification: {
        title: 'Hisab Kitab',
        body: 'Have you updated your today`s #HisabKitab?',
        click_action: 'https://hisabkitab.in'
      }
    };
    return this.http.post('https://fcm.googleapis.com/fcm/send', this.data, {headers: this.headers});
  }
}
