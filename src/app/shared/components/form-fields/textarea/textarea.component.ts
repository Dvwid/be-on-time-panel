import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlContainer, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
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
  styleUrls: ['./textarea.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class TextareaComponent extends FormFieldAbstractComponent {

  @Input() rows = 2;

}
