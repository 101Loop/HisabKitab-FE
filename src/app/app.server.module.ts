import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppModule} from './app.module';
import {AppComponent} from './component/root/app.component';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  imports: [
    CommonModule,
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  declarations: [],
  providers: [
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule { }
