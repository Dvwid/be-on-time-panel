import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {MaterialModule} from "../../../core/material/material.module";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ConfirmationDialogComponent
  ]
})
export class ConfirmationDialogModule {
}
