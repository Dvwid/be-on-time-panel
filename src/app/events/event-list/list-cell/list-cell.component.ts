import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss']
})
export class ListCellComponent {

  @Input() value: any;
}
