import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";
import {Observable} from "rxjs";

export interface ConfirmationDialogData {
  title: string;
  content: string;
  doAfterConfirmation: () => Observable<any>;
  doOnSuccess: (data?: any) => void;
}


@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private matDialog: MatDialog) {
  }

  open(data: ConfirmationDialogData): MatDialogRef<ConfirmationDialogComponent> {
    const dialogRef = this.matDialog
      .open(ConfirmationDialogComponent, {
        data
      })

    dialogRef
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        data?.doAfterConfirmation()?.subscribe(() => data?.doOnSuccess());
      });

    return dialogRef;

  }
}
