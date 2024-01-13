import {Component, HostListener, inject} from '@angular/core';
import {BehaviorSubject, finalize} from "rxjs";
import {convertBase64ToImage, initializePagination} from "../../../../../core/utilities";
import {ImagesService} from "../../../../services/images.service";
import {ImageDto} from "../../../../../core/dtos/ImageDto";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.scss']
})
export class GalleryDialogComponent {

  areImagesLoading$ = new BehaviorSubject(false);
  images: ImageDto[] = [];
  currentImages: ImageDto[] = [];

  #imagesService = inject(ImagesService);
  #dialogRef = inject(MatDialogRef<GalleryDialogComponent>);
  pagination = initializePagination(5);

  get totalPages(): number {
    return Math.ceil(this.images?.length / this.pagination?.pageSize) || 1;
  }

  @HostListener('click', ['$event.target'])
  onImageClick(target: HTMLElement) {
    if (target?.tagName?.toLowerCase() === 'img' && target?.title) {
      const selectedImg = this.images?.find(image => image?.id === target?.title);
      this.closeDialog(selectedImg);
    }
  }

  ngOnInit() {
    this.getImages();
  }

  private getImages() {
    this.areImagesLoading$.next(true);

    this.#imagesService
      .getImages(this.pagination)
      .pipe(finalize(() => this.areImagesLoading$.next(false)))
      .subscribe(data => {
        this.images = data || [];

        if (!data) {
          return;
        }
        this.setCurrentImages();
      });
  }


  closeDialog(image?: ImageDto) {
    this.#dialogRef.close(image);
  }

  previousPage() {
    if (this.pagination.page === 1) {
      return;
    }
    this.pagination.page--;
    this.setCurrentImages();
  }

  nextPage() {
    if (this.pagination.page === this.totalPages) {
      return;
    }

    this.pagination.page++;
    this.setCurrentImages();
  }

  setCurrentImages() {
    if (document.getElementById('image-wrapper')) {
      document.getElementById('image-wrapper').innerHTML = '';
    }
    const start = (this.pagination.page - 1) * this.pagination.pageSize;
    const end = this.pagination.page * this.pagination.pageSize;
    this.currentImages = this.images.slice(start, end);
    setTimeout(() => this.currentImages.reverse()?.forEach((img) => convertBase64ToImage(img, 'event-image', 'image-wrapper')));
  }
}
