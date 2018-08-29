import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {SignupComponent} from './component/signup/signup.component';
import {ForgetpasswordComponent} from './component/forgetpassword/forgetpassword.component';
import {OtpverificationComponent} from './component/otpverification/otpverification.component';
import {PostdebitComponent} from './component/postdebit/postdebit.component';
import {PostcreditComponent} from './component/postcredit/postcredit.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {DebitlistComponent} from './component/debitlist/debitlist.component';
import {CreditlistComponent} from './component/creditlist/creditlist.component';
import {LogoutDialogComponent} from './component/logout-dialog/logout-dialog.component';
import {SuccessMessageComponent} from './component/success-message/success-message.component';
import {ShowStatusComponent} from './component/show-status/show-status.component';
import {FilterComponent} from './component/filter/filter.component';
import {FeedbackComponent} from './component/feedback/feedback.component';
import {ContactComponent} from './component/contact/contact.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ChangePasswordComponent} from './component/change-password/change-password.component';
import {LandingPageComponent} from './component/landing-page/landing-page.component';
import {PrivacypolicyComponent} from './component/privacypolicy/privacypolicy.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
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
  { path: 'showstatus', component: ShowStatusComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'feedback', component: FeedbackComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'changepassword', component: ChangePasswordComponent},
  { path: 'policy', component: PrivacypolicyComponent}
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
