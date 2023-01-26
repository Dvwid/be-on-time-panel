import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelAuthComponent} from './panel-auth.component';
import {PanelAuthRoutingModule} from './panel-auth-routing.module';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthFormComponent} from './form/auth-form.component';
import {AuthService} from "./services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelAuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    PanelAuthComponent,
    AuthFormComponent,
  ],
  exports: [
    MaterialModule,
    FormsModule
  ],
  providers: [
    AuthService,
  ]
})
export class PanelAuthModule {
}
