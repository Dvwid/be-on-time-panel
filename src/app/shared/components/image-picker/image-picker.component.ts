import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragAndDropFileDirective} from "../../directives/drag-and-drop-file.directive";

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [CommonModule, DragAndDropFileDirective],
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {

  @ViewChild('dragAndDropRef') dragAndDropRef: ElementRef;
  @ViewChild('imagesWrapperRef') imagesWrapperRef: ElementRef;

  file: File | undefined;

  onFileDropped(file: File) {
    this.file = file;
  }

  fileBrowseHandler(event: any) {
    this.file = event?.target?.files?.[0];
  }

  addClassOnOver() {
    this.dragAndDropRef.nativeElement.classList.add('dragover');
    this.imagesWrapperRef.nativeElement.classList.add('dragover');
  }

  removeClassAfterLeave() {
    this.dragAndDropRef.nativeElement.classList.remove('dragover');
    this.imagesWrapperRef.nativeElement.classList.remove('dragover');
  }
}
