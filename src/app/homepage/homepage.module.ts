import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {HomepageRoutingModule} from "./homepage-routing.module";
import {MaterialModule} from "../core/material/material.module";


@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule,
    MaterialModule
  ],
  declarations: [
    HomepageComponent,
  ],
  exports: [
    MaterialModule
  ]
})
export class HomepageModule {
}
