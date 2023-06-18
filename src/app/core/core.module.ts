import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelAuthModule} from './auth/panel-auth.module';
import {HttpClientModule} from '@angular/common/http';
import {AjaxService} from './ajax.service';
import {ExceptionService} from './exception.service';
import {NotificationComponent} from './notification/notification.component';
import {MenuComponent} from "./menu/menu.component";
import {MenuElementComponent} from "./menu/menu-element/menu-element.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    PanelAuthModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    NotificationComponent,
    MenuComponent,
    MenuElementComponent
  ],
  exports: [
    PanelAuthModule,
    HttpClientModule,
    NotificationComponent,
    MenuComponent
  ],
  providers: [
    AjaxService,
    ExceptionService
  ],
})
export class CoreModule {
}
