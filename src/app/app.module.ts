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
import {NewspageComponent} from './component/dashboard/newspage.component';
import {FlexyJobListComponent} from './component/imcoming-list/flexy-job-list.component';
import {LogoutDialogComponent} from './component/logout-dialog/logout-dialog.component';
import {FlexyrequestComponent} from './component/post-incoming/flexyrequest.component';
import {SuccessMessageComponent} from './component/success-message/success-message.component';
import {NormalJobListComponent} from './component/outgoing-list/normal-job-list.component';
import {NormalrequestComponent} from './component/post-outgoing/normalrequest.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    OtpverificationComponent,
    NewspageComponent,
    FlexyJobListComponent,
    LogoutDialogComponent,
    FlexyrequestComponent,
    NormalJobListComponent,
    NormalrequestComponent,
    SuccessMessageComponent
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
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
