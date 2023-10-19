import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../../core/material/material.module";
import {ControlContainer, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-mini-fab-spinner-button',
  templateUrl: './mini-fab-spinner-button.component.html',
  styleUrls: ['./mini-fab-spinner-button.component.scss'],
  imports: [
    CommonModule,
    MaterialModule],
  standalone: true,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class MiniFabSpinnerButtonComponent {

  @Output() btnClick = new EventEmitter();

  @Input() isSpinnerVisible: boolean;
  @Input() label: string;
  @Input() icon = 'save';
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() form: FormGroupDirective;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

}
