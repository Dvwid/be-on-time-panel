import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../../core/material/material.module";
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: '',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  template: '',
  styles: []
})
export class SelectAbstractComponent<TValue, TGroup> {

  // @ts-ignore
  @Input() formGroup: FormGroup<TGroup>;
  @Input() controlName: keyof TGroup;
  @Input() options: TValue[];
  @Input() multiple: boolean;
  @Input() displayNameKey: keyof TValue;
  @Input() valueKey: keyof TValue;
  @Input() suffixIcon: string;
  @Input() label: string;
  @Input() form: FormGroupDirective;
  @Input() showSpinner: boolean;
  @Input() disabled: boolean;
  @Input() showOptionIcons: boolean;
}
