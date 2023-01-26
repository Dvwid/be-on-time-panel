import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelAuthModule} from './auth/panel-auth.module';
import {HttpClientModule} from '@angular/common/http';
import {AjaxService} from './ajax.service';
import {ExceptionService} from './exception.service';
import {NotificationComponent} from './notification/notification.component';

@NgModule({
  imports: [CommonModule, PanelAuthModule, HttpClientModule],
  declarations: [NotificationComponent],
  exports: [PanelAuthModule, HttpClientModule, NotificationComponent],
  providers: [AjaxService, ExceptionService],
})
export class CoreModule {
}
