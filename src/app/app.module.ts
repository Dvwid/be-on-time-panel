import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, NgxMatMomentAdapter} from '@angular-material-components/moment-adapter';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatNativeDateModule
} from "@angular-material-components/datetime-picker";

@NgModule({
  imports: [
    BrowserModule,
    NgxMatNativeDateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}



