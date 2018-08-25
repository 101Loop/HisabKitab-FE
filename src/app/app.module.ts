import { BrowserModule } from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';

import { AppComponent } from './component/root/app.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './component/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SignupComponent} from './component/signup/signup.component';
import {ForgetpasswordComponent} from './component/forgetpassword/forgetpassword.component';
import {ToastrModule} from 'ngx-toastr';
import {OtpverificationComponent} from './component/otpverification/otpverification.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {CreditlistComponent} from './component/creditlist/creditlist.component';
import {LogoutDialogComponent} from './component/logout-dialog/logout-dialog.component';
import {PostcreditComponent} from './component/postcredit/postcredit.component';
import {SuccessMessageComponent} from './component/success-message/success-message.component';
import {DebitlistComponent} from './component/debitlist/debitlist.component';
import {PostdebitComponent} from './component/postdebit/postdebit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {ShowStatusComponent} from './component/show-status/show-status.component';
import { FilterComponent } from './component/filter/filter.component';
import {FeedbackComponent} from './component/feedback/feedback.component';
import {ContactComponent} from './component/contact/contact.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ChangePasswordComponent} from './component/change-password/change-password.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import {isPlatformBrowser} from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    OtpverificationComponent,
    DashboardComponent,
    CreditlistComponent,
    LogoutDialogComponent,
    PostcreditComponent,
    DebitlistComponent,
    PostdebitComponent,
    SuccessMessageComponent,
    ShowStatusComponent,
    FilterComponent,
    FeedbackComponent,
    ContactComponent,
    ProfileComponent,
    ChangePasswordComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'HisabKitab' }),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTabsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSliderModule,
    MatExpansionModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    // console.log(`Running ${platform} with appId=${appId}`);
  }
}
