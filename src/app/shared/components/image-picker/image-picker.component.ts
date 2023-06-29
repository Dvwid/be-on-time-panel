import {Component} from '@angular/core';
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

  file: File | undefined;

  onFileDropped(file: File) {
    this.file = file;
  }

  fileBrowseHandler(event: any) {
    this.file = event?.target?.files?.[0];
  }
}
