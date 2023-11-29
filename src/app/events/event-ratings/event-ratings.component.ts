import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RatingsDialogData} from "../../core/dtos/RatingsDialogData";
import {EventRatingDto} from "../../core/dtos/EventDto";

@Component({
  selector: 'app-event-ratings',
  templateUrl: './event-ratings.component.html',
  styleUrls: ['./event-ratings.component.scss']
})
export class EventRatingsComponent {

  ratings: EventRatingDto[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: RatingsDialogData,
              private dialogRef: MatDialogRef<EventRatingsComponent>) {
    this.ratings = data?.ratings;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
