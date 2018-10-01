import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import {AppComponent} from './component/root/app.component';

@NgModule({
  imports: [
        AppModule, ServerModule, ModuleMapLoaderModule
  ],
  declarations: [],
  bootstrap: [AppComponent]

})
export class AppServerModule { }
