import {Component} from '@angular/core';
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventImageFormGroup} from "../../../../core/dtos/EventForm";
import {ImagesService} from "../../../services/images.service";
import {ImageDto} from "../../../../core/dtos/ImageDto";
import {NotificationService} from "../../../../core/notification/services/notification.service";
import {BehaviorSubject, finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {GalleryDialogComponent} from "./gallery-dialog/gallery-dialog.component";
import {convertBase64ToImage} from "../../../../core/utilities";

@Component({
  selector: 'app-event-image-form',
  templateUrl: './event-image-form.component.html',
  styleUrls: ['./event-image-form.component.scss']
})
export class EventImageFormComponent extends EventFormAbstractComponent<EventImageFormGroup> {

  isImageUploading$ = new BehaviorSubject(false);
  selectedImage: ImageDto;

  constructor(private _storageService: ImagesService,
              private _notificationService: NotificationService,
              private _matDialog: MatDialog) {
    super();
  }

  uploadFile(file: File) {
    this.isImageUploading$.next(true);

    this._storageService
      .uploadImage(file)
      .pipe(finalize(() => this.isImageUploading$.next(false)))
      .subscribe(data => this.doAfterUploadImage(data));
  }

  private doAfterUploadImage(image: ImageDto) {
    this._notificationService.success('Sukces!', 'Dodano nowe zdjęcie');
    this.selectedImage = image;
    setTimeout(() => convertBase64ToImage(image, 'event-selected-image', 'image-wrapper'))
    this.formGroup.controls.imageId.setValue(image?.id);
  }

  openGallery() {
    const matDialogRef = this._matDialog.open(GalleryDialogComponent);

    matDialogRef
      .afterClosed()
      .subscribe((image: ImageDto) => {
        if (!image) {
          return;
        }

        this.selectedImage = image;
        setTimeout(() => convertBase64ToImage(image, 'event-selected-image', 'image-wrapper'));
        this.formGroup.controls.imageId.setValue(image?.id);
      })
  }

  clearSelectedImage() {
    this.selectedImage = undefined;
    this.formGroup.controls.imageId.setValue(null);
  }
}
