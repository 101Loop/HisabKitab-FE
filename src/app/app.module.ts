import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './component/root/app.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatRadioModule, MatSelectModule,
  MatSidenavModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './component/login/login.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
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
    ShowStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
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
    MatCheckboxModule,
    MatRadioModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
