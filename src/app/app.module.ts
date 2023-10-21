import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import "@angular/common/locales/global/pl";

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
    {provide: MAT_DATE_LOCALE, useValue: 'pl'},
    {provide: LOCALE_ID, useValue: 'pl'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}



