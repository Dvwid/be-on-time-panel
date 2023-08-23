import {Component, HostListener, OnInit} from '@angular/core';
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventImageFormGroup} from "../../../../core/dtos/EventForm";
import {ImagesService} from "../../../services/images.service";
import {ImageDto} from "../../../../core/dtos/ImageDto";
import {NotificationService} from "../../../../core/notification/services/notification.service";
import {BehaviorSubject, finalize} from "rxjs";
import {convertBase64ToImage} from "../../../../core/utilities";

@Component({
  selector: 'app-event-image-form',
  templateUrl: './event-image-form.component.html',
  styleUrls: ['./event-image-form.component.scss']
})
export class EventImageFormComponent extends EventFormAbstractComponent<EventImageFormGroup> implements OnInit {

  images: ImageDto[] = [];

  isImageUploading$ = new BehaviorSubject(false);
  areImagesLoading$ = new BehaviorSubject(false);

  @HostListener('click', ['$event.target'])
  onImageClick(target: HTMLElement) {
    if (target?.tagName?.toLowerCase() === 'img' && target?.title) {
      this.setSelectedImage(target);
    }
  }

  constructor(private _storageService: ImagesService,
              private _notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    this.getImages();
  }

  uploadFile(file: File) {
    this.isImageUploading$.next(true);

    this._storageService
      .uploadImage(file)
      .pipe(finalize(() => this.isImageUploading$.next(false)))
      .subscribe(data => this.doAfterUploadImage(data));
  }

  private getImages() {
    this.areImagesLoading$.next(true);

    this._storageService
      .getImages()
      .pipe(finalize(() => this.areImagesLoading$.next(false)))
      .subscribe(data => {
        this.images = data || [];
        if (!data) {
          return;
        }
        setTimeout(() => data?.forEach((img) => convertBase64ToImage(img, 'event-image', 'image-wrapper')));
      });
  }

  private doAfterUploadImage(image: ImageDto) {
    if (this.images.length === 5) {
      this.images.splice(4, 1);
    }
    convertBase64ToImage(image, 'event-image', 'image-wrapper');
    this._notificationService.success('Sukces!', 'Dodano nowe zdjęcie');
  }

  private setSelectedImage(target: HTMLElement) {
    document
      .querySelectorAll('img')
      .forEach((img) => img.classList.remove('selected'));

    if (target?.title === this.formGroup.controls.imageId.value) {
      this.formGroup?.controls?.imageId?.setValue(null);
      return;
    }

    target.classList.add('selected');

    this.formGroup.controls.imageId.setValue(target?.title);
  }
}
