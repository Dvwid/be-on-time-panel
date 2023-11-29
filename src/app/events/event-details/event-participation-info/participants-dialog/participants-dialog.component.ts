import {Component, Inject} from '@angular/core';
import {ParticipantInfoDto} from "../../../../core/dtos/EventDto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface ParticipantsDialogData {
  header: string;
  participants: ParticipantInfoDto[];
}

@Component({
  selector: 'app-participants-dialog',
  templateUrl: './participants-dialog.component.html'
})
export class ParticipantsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ParticipantsDialogData,
              private dialogRef: MatDialogRef<ParticipantsDialogComponent>) {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
