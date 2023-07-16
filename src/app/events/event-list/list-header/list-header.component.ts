import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent {

  @Input() icon: string;
  @Input() label: string;

}
