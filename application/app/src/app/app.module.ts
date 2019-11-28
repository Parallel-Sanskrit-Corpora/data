import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {WebStorageModule} from 'ngx-store';
import {AppRoutingModule} from './app-routing.module';

import {AppConfig, initConfig} from './app.config';
import {ProjectMaterialModule} from './material.module';
import {NgxMaskModule} from 'ngx-mask';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UIModule} from './ui/ui.module';

import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    UIModule.forRoot(),
    NgxMaskModule.forRoot(),
    WebStorageModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ProjectMaterialModule
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  providers: [
    /*{
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true
    }*/
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
