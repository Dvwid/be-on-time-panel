import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from 'src/app/core/material/material.module';
import {ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class TimepickerComponent implements OnInit {

  @Input() hourControlName: string;
  @Input() minutesControlName: string;
  @Input() formGroup: FormGroup;

  ngOnInit() {
  }

}
