import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from 'src/app/core/material/material.module';
import {ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {FormFieldAbstractComponent} from "../form-field-abstract.component";
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class DatepickerComponent extends FormFieldAbstractComponent {
  date: Date;
  control: FormControl;

  constructor() {
    super();
    this.control = new FormControl();
  }
}
