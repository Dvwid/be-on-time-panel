import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from "@angular/material/core";
import {MaterialModule} from "../../../core/material/material.module";
import {Subject} from "rxjs";

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

  @Output() afterClick = new EventEmitter();

  @Input() icon: string;
  @Input() label: string;
  @Input() showSpinner: boolean;
  @Input() btnStyle: 'outlined' | 'primary';

}
