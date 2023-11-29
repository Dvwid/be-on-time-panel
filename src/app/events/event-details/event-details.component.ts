import {Component, inject, OnInit} from '@angular/core';
import {EventDto, EventRatingDto} from 'src/app/core/dtos/EventDto';
import {ActivatedRoute, Router} from "@angular/router";
import {ImagesService} from "../services/images.service";
import {convertBase64ToImage} from "../../core/utilities";
import {EventService} from "../services/event.service";
import {JoinToEventRequestDto} from "../../core/dtos/JoinToEventRequestDto";
import {AuthService} from "../../core/auth/services/auth.service";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {NotificationService} from "../../core/notification/services/notification.service";
import {ParticipationTypeEnum} from "../../core/dtos/ParticipationTypeEnum";
import {LeaveFromEventRequestDto} from "../../core/dtos/LeaveFromEventRequestDto";
import {StarRatingColor} from "../../shared/components/star-rating/star-rating.component";
import {MatDialog} from "@angular/material/dialog";
import {EventRatingDialogComponent, EventRatingDialogData} from "./event-rating-dialog/event-rating-dialog.component";
import {EventRatingsComponent} from "../event-ratings/event-ratings.component";
import {RatingsDialogData} from "../../core/dtos/RatingsDialogData";
import {ConfirmationDialogService} from "../../shared/components/confirmation-dialog/confirmation-dialog.service";
import {Empty} from "../../core/dtos/Empty";

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
  currentUserJoinDeclarationStatus: ParticipationTypeEnum;

  participationTypeEnum = ParticipationTypeEnum;

  rating: number = 0;
  userRating: EventRatingDto;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  isRatingEnabled = false;

  get userIsInitiator(): boolean {
    return this.event?.initiatorInfo?.initiatorId === this.#authService.currentUser$?.value?.id;
  };

  constructor(private dialog: MatDialog,
              private confirmationDialogService: ConfirmationDialogService,
              private router: Router) {
  }

  ngOnInit() {
    this.getEventDetails();
  }

  onRatingChanged(rating: number) {
    const dialogRef = this.dialog.open(EventRatingDialogComponent, {
      data: {
        rating: rating,
        userId: this.#authService?.currentUser$?.value?.id,
        eventId: this.event?.id
      } as EventRatingDialogData,
      autoFocus: false
    });

    dialogRef
      .afterClosed()
      .subscribe((data: EventDto) => {
        if (!data) {
          return;
        }
        this.event = data;
        this.setCurrentUserJoinDeclarationStatus();
        this.setUserRateIfExist();
      });
  }

  showRatings() {
    this.dialog.open(EventRatingsComponent, {
      data: {
        ratings: this.event?.ratings
      } as RatingsDialogData,
      autoFocus: false
    });
  }

  changeDeclarationOfParticipation(declaration: ParticipationTypeEnum) {
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

  setCurrentUserJoinDeclarationStatus(): ParticipationTypeEnum {
    const statusesToCheck = [
      ParticipationTypeEnum.DECLINED,
      ParticipationTypeEnum.CONFIRMED,
      ParticipationTypeEnum.TENTATIVE,
    ];

    for (const status of statusesToCheck) {
      if (this.checkHasParticipantByKey(status)) {
        return this.currentUserJoinDeclarationStatus = status;
      }
    }

    return this.currentUserJoinDeclarationStatus = undefined;
  };

  checkHasParticipantByKey(type: ParticipationTypeEnum) {
    return this.event
      ?.participantsInfo
      ?.[type]
      ?.some(participant => participant?.participantId === this.#authService?.currentUser$?.value?.id);
  }

  openDeleteConfirmation() {
    this.confirmationDialogService
      .open({
        title: 'Czy na pewno chcesz usunąć wydarzenie?',
        content: 'Tej operacji nie da się cofnąć!',
        doAfterConfirmation: () => this.deleteEvent(),
        doOnSuccess: () => this.doAfterDelete()
      });
  }

  private getEventDetails() {
    this.#eventService
      .getEventById(this.eventId)
      .subscribe((data) => {
        this.event = data;
        this.setCurrentUserJoinDeclarationStatus();
        this.setUserRateIfExist();
        this.checkUserCanRateEvent();

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

  private prepareJoinToEventRequestDto(declaration: ParticipationTypeEnum): JoinToEventRequestDto {
    return {
      eventId: this.event?.id,
      user: this.#authService.currentUser$.value,
      declaration
    }
  }

  private leave(declaration: ParticipationTypeEnum) {
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

  private prepareLeaveFromEventRequestDto(declaration: ParticipationTypeEnum): LeaveFromEventRequestDto {
    return {
      eventId: this.event?.id,
      userId: this.#authService.currentUser$.value?.id,
      declaration
    }
  }

  private setUserRateIfExist() {
    const userRating = this.event
      ?.ratings
      ?.find((rating) => rating?.userId === this.#authService.currentUser$.value.id);

    this.userRating = userRating;
    this.rating = userRating?.rate || this.event?.rating;
  }

  private checkUserCanRateEvent() {
    this.isRatingEnabled = this.currentUserParticipate(ParticipationTypeEnum.TENTATIVE)
      || this.currentUserParticipate(ParticipationTypeEnum.CONFIRMED)

  }

  private currentUserParticipate(participateType: ParticipationTypeEnum): boolean {
    return this.event
      ?.participantsInfo
      ?.[participateType]
      .some(participant => participant?.participantId === this.#authService?.currentUser$?.value?.id);
  }

  private deleteEvent(): Observable<Empty> {
    return this.#eventService.delete(this.event?.id);
  }

  private doAfterDelete() {
    this.#notificationService.success('Sukces!', 'Pomyślnie usunięto wydarzenie');
    this.router.navigate(['/events/']);
  }
}
