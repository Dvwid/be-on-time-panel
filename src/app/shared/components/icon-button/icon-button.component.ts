import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from "@angular/material/core";
import {MaterialModule} from "../../../core/material/material.module";
import {ControlContainer, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MaterialModule
  ],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class IconButtonComponent {

  @Output() afterClick = new EventEmitter();

  @Input() icon: string;
  @Input() label: string;
  @Input() showSpinner: boolean;
  @Input() btnStyle: 'outlined' | 'primary' | 'standard';
  @Input() form: FormGroupDirective;
  @Input() disabled: boolean;

}
