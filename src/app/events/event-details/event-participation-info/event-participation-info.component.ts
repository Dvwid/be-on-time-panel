import {Component, Input} from '@angular/core';
import {EventDto} from "../../../core/dtos/EventDto";
import {ParticipationTypeEnum} from "../../../core/dtos/ParticipationTypeEnum";
import {MatDialog} from "@angular/material/dialog";
import {ParticipantsDialogComponent, ParticipantsDialogData} from "./participants-dialog/participants-dialog.component";

@Component({
  selector: 'app-event-participation-info',
  templateUrl: './event-participation-info.component.html'
})
export class EventParticipationInfoComponent {

  @Input() event: EventDto;
  @Input() participationType: ParticipationTypeEnum
  @Input() label: string;

  constructor(private dialog: MatDialog) {
  }


  showAllParticipants() {
    const header = this.prepareDialogHeader();
    this.dialog.open(ParticipantsDialogComponent, {
      data: {
        participants: this.event?.participantsInfo?.[this.participationType],
        header
      } as ParticipantsDialogData,
      autoFocus: false
    })
  }

  private prepareDialogHeader(): string {
    switch (this.participationType) {
      case ParticipationTypeEnum.CONFIRMED:
        return this.event?.ended ? 'Wzieli udział' : 'Wezmą udział';
      case ParticipationTypeEnum.DECLINED:
        return 'Niezainteresowani';
      case ParticipationTypeEnum.TENTATIVE:
        return 'Może';
    }
  }
}
