import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";

@Component({
  selector: 'app-stepper-previous-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule
  ],
  templateUrl: './stepper-previous-button.component.html'
})
export class StepperPreviousButtonComponent {

}
