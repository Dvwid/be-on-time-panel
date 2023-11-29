import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AdditionalOptionsForm} from "../core/dtos/AdditionalOptionsForm";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  selectedView: 'list' | 'schedule' = 'schedule';
  additionalOptionsForm: FormGroup<AdditionalOptionsForm>;

  constructor() {
  }


  ngOnInit() {
    this.initializeAdditionalOptionsForm();
  }

  private initializeAdditionalOptionsForm() {
    this.additionalOptionsForm = new FormGroup<AdditionalOptionsForm>({
      showPersonalizedEvents: new FormControl<boolean>(false)
    })
  }
}
