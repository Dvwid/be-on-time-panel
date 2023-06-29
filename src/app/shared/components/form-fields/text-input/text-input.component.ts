import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from 'src/app/core/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormFieldAbstractComponent} from "../form-field-abstract.component";

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends FormFieldAbstractComponent {

}
