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
import {UserJoinDeclarationStatusEnum} from "../../core/dtos/UserJoinDeclarationStatusEnum";
import {LeaveFromEventRequestDto} from "../../core/dtos/LeaveFromEventRequestDto";

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
  currentUserJoinDeclarationStatus: UserJoinDeclarationStatusEnum;

  userJoinDeclarationStatusEnum = UserJoinDeclarationStatusEnum;

  constructor() {
  }

  ngOnInit() {
    this.getEventDetails();
  }

  changeDeclarationOfParticipation(declaration: UserJoinDeclarationStatusEnum) {
    if (this.currentUserJoinDeclarationStatus === declaration) {
      this.leave(declaration);
      return;
    }

    const req = this.prepareJoinToEventRequestDto(declaration);
    this.isJoining$.next(true);

    this.#eventService
      .join(req)
      .pipe(finalize(() => this.isJoining$.next(false)))
      .subscribe((data: EventDto) => {
        this.#notificationService.success('Sukces!', 'Zmieniono deklarację udziału');
        this.event.participantsInfo = data?.participantsInfo;
        this.setCurrentUserJoinDeclarationStatus();
      });
  }

  setCurrentUserJoinDeclarationStatus(): UserJoinDeclarationStatusEnum {
    const statusesToCheck = [
      UserJoinDeclarationStatusEnum.DECLINED,
      UserJoinDeclarationStatusEnum.CONFIRMED,
      UserJoinDeclarationStatusEnum.TENTATIVE,
    ];

    for (const status of statusesToCheck) {
      if (this.checkHasParticipantByKey(status)) {
        return this.currentUserJoinDeclarationStatus = status;
      }
    }

    return this.currentUserJoinDeclarationStatus = undefined;
  };

  checkHasParticipantByKey(type: UserJoinDeclarationStatusEnum) {
    return this.event
      ?.participantsInfo
      ?.[type]
      ?.some(participant => participant?.participantId === this.#authService?.currentUser$?.value?.id);
  }

  private getEventDetails() {
    this.#eventService
      .getEventById(this.eventId)
      .subscribe((data) => {
        this.event = data;
        this.setCurrentUserJoinDeclarationStatus();
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

  private prepareJoinToEventRequestDto(declaration: UserJoinDeclarationStatusEnum): JoinToEventRequestDto {
    return {
      eventId: this.event?.id,
      user: this.#authService.currentUser$.value,
      declaration
    }
  }

  private leave(declaration: UserJoinDeclarationStatusEnum) {
    const req = this.prepareLeaveFromEventRequestDto(declaration);
    this.isJoining$.next(true);

    this.#eventService
      .leave(req)
      .pipe(finalize(() => this.isJoining$.next(false)))
      .subscribe((data: EventDto) => {
        this.#notificationService.success('Sukces!', 'Zmieniłeś deklarację udziału');
        this.event.participantsInfo = data?.participantsInfo;
        this.setCurrentUserJoinDeclarationStatus();
      });
  }

  private prepareLeaveFromEventRequestDto(declaration: UserJoinDeclarationStatusEnum): LeaveFromEventRequestDto {
    return {
      eventId: this.event?.id,
      userId: this.#authService.currentUser$.value?.id,
      declaration
    }
  }
}
