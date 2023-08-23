import {Component, inject, OnInit} from '@angular/core';
import {EventDto} from 'src/app/core/dtos/EventDto';
import {ActivatedRoute} from "@angular/router";
import {ImagesService} from "../services/images.service";
import {convertBase64ToImage} from "../../core/utilities";
import {EventService} from "../services/event.service";
import {JoinToEventRequestDto} from "../../core/dtos/JoinToEventRequestDto";
import {AuthService} from "../../core/auth/services/auth.service";
import {BehaviorSubject, finalize} from "rxjs";
import {NotificationService} from "../../core/notification/services/notification.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  #imagesService = inject(ImagesService);
  #eventService = inject(EventService);
  #activatedRoute = inject(ActivatedRoute);
  #authService = inject(AuthService);
  #notificationService = inject(NotificationService);

  eventId = this.#activatedRoute.snapshot.paramMap.get('eventId');
  event: EventDto;

  isJoining$ = new BehaviorSubject(false);

  get currentUserJoinedToEvent(): boolean {
    return this.event?.participantsInfo?.participants?.some(participant => participant?.participantId === this.#authService?.currentUser$?.value?.id);
  };

  constructor() {
  }

  ngOnInit() {
    this.getEventDetails();
  }

  joinToEvent() {
    const req = this.prepareJoinToEventRequestDto();
    this.isJoining$.next(true);

    this.#eventService
      .join(req)
      .pipe(finalize(() => this.isJoining$.next(false)))
      .subscribe((data: EventDto) => {
        this.#notificationService.success('Sukces!', 'Dołączyłeś do wydarzenia');
        this.event.participantsInfo = data?.participantsInfo;
      });
  }

  leaveEvent() {
    const req = this.prepareJoinToEventRequestDto();
    this.isJoining$.next(true);

    this.#eventService
      .leave(req)
      .pipe(finalize(() => this.isJoining$.next(false)))
      .subscribe((data: EventDto) => {
        this.#notificationService.success('Sukces!', 'Zrezygnowałeś z wydarzenia');
        this.event.participantsInfo = data?.participantsInfo;
      });
  }


  private getEventDetails() {
    this.#eventService
      .getEventById(this.eventId)
      .subscribe((data) => {
        this.event = data;
        if (data?.imageInfo?.imageId) {
          this.getImage(data?.imageInfo?.imageId);
        }
      });
  }

  private getImage(imageId: string | undefined) {
    this.#imagesService
      .getImage(imageId)
      .subscribe(data => convertBase64ToImage(data, 'preview-event-image', 'image-wrapper'));
  }

  private prepareJoinToEventRequestDto(): JoinToEventRequestDto {
    return {
      eventId: this.event?.id,
      user: this.#authService.currentUser$.value
    }
  }
}
