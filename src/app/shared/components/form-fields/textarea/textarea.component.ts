import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/app/core/material/material.module';
import {FormFieldAbstractComponent} from "../form-field-abstract.component";

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends FormFieldAbstractComponent {

}
