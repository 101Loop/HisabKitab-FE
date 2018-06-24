import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {SignupComponent} from './component/signup/signup.component';
import {ForgetpasswordComponent} from './component/forgetpassword/forgetpassword.component';
import {OtpverificationComponent} from './component/otpverification/otpverification.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {CreditlistComponent} from './component/creditlist/creditlist.component';
import {LogoutDialogComponent} from './component/logout-dialog/logout-dialog.component';
import {PostcreditComponent} from './component/postcredit/postcredit.component';
import {DebitlistComponent} from './component/debitlist/debitlist.component';
import {PostdebitComponent} from './component/postdebit/postdebit.component';
import {SuccessMessageComponent} from './component/success-message/success-message.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
   { path: 'signup', component: SignupComponent },
   { path: 'forgetpassword', component: ForgetpasswordComponent },
   { path: 'otpverification', component: OtpverificationComponent },
   { path: 'normalrequest', component: PostdebitComponent },
   { path: 'hisabkitabrequest', component: PostcreditComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'debithistory', component: DebitlistComponent },
   { path: 'credithistory', component: CreditlistComponent },
   { path: 'logout', component: LogoutDialogComponent },
  { path: 'success', component: SuccessMessageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    [ RouterModule.forRoot(routes) ]
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
