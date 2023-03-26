import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-element',
  templateUrl: './menu-element.component.html',
  styleUrls: ['./menu-element.component.scss']
})
export class MenuElementComponent {

  @Input() icon: string;
  @Input() label: string;

}
