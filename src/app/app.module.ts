import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {MenuElementComponent} from "./core/menu-element/menu-element.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    MenuElementComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
