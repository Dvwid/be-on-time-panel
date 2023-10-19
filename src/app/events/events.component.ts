import {Component} from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  selectedView: 'list' | 'schedule' = 'schedule';

  constructor() {
  }

}
