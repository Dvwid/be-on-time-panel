import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../../core/material/material.module";

@Component({
  selector: 'app-stepper-next-button',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './stepper-next-button.component.html'
})
export class StepperNextButtonComponent {

}
