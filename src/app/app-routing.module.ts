import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {SignupComponent} from './component/signup/signup.component';
import {ForgetpasswordComponent} from './component/forgetpassword/forgetpassword.component';
import {OtpverificationComponent} from './component/otpverification/otpverification.component';
import {NewspageComponent} from './component/dashboard/newspage.component';
import {FlexyJobListComponent} from './component/imcoming-list/flexy-job-list.component';
import {LogoutDialogComponent} from './component/logout-dialog/logout-dialog.component';
import {FlexyrequestComponent} from './component/post-incoming/flexyrequest.component';
import {NormalJobListComponent} from './component/outgoing-list/normal-job-list.component';
import {NormalrequestComponent} from './component/post-outgoing/normalrequest.component';
import {SuccessMessageComponent} from './component/success-message/success-message.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
   { path: 'signup', component: SignupComponent },
   { path: 'forgetpassword', component: ForgetpasswordComponent },
   { path: 'otpverification', component: OtpverificationComponent },
   { path: 'normalrequest', component: NormalrequestComponent },
   { path: 'flexyrequest', component: FlexyrequestComponent },
   { path: 'newspage', component: NewspageComponent },
   { path: 'normalpost', component: NormalJobListComponent },
   { path: 'incoming', component: FlexyJobListComponent },
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
