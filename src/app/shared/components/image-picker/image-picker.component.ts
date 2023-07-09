import {Component, ElementRef, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragAndDropFileDirective} from "../../directives/drag-and-drop-file.directive";
import {Subject} from "rxjs";
import {MaterialModule} from "../../../core/material/material.module";
import {StepperNextButtonComponent} from "../form-fields/stepper-next-button/stepper-next-button.component";
import {StepperPreviousButtonComponent} from "../form-fields/stepper-previous-button/stepper-previous-button.component";

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [
    CommonModule,
    DragAndDropFileDirective,
    MaterialModule,
    StepperNextButtonComponent,
    StepperPreviousButtonComponent
  ],
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {

  @Output() fileChange = new Subject<File>();

  @Input() isFileUploading: boolean;

  @ViewChild('dragAndDropRef') dragAndDropRef: ElementRef;
  @ViewChild('imagesWrapperRef') imagesWrapperRef: ElementRef;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef<HTMLInputElement>;

  file: File | undefined;

  onFileDropped(file: File) {
    this.file = file;
    this.fileChange.next(this.file);
  }

  fileBrowseHandler(event: any) {
    this.file = event?.target?.files?.[0];
    this.fileChange.next(this.file);
    this.fileUpload.nativeElement.value = '';
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
