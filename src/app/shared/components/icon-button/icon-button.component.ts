import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from "@angular/material/core";
import {MaterialModule} from "../../../core/material/material.module";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MaterialModule
  ],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input() icon: string;
  @Input() label: string;
  @Input() showSpinner: boolean;

}
