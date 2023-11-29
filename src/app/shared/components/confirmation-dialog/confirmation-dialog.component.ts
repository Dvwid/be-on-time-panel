import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogData} from "./confirmation-dialog.service";


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {

  title: string;
  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: ConfirmationDialogData,
              private matDialogRef: MatDialogRef<ConfirmationDialogComponent>) {
    this.title = data?.title;
    this.content = data?.content;
  }

  close(confirmed: boolean) {
    this.matDialogRef.close(confirmed);
  }
}
