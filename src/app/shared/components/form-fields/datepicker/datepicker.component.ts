import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from 'src/app/core/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {FormFieldAbstractComponent} from "../form-field-abstract.component";

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends FormFieldAbstractComponent {

}
