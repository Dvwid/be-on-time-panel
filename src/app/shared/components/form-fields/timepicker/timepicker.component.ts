import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from 'src/app/core/material/material.module';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-timepicker',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  @Input() hourControlName: string;
  @Input() minutesControlName: string;
  @Input() formGroup: FormGroup;

  hourOptions: string[] = [];
  minuteOptions: string[] = [];

  hourFilteredOptions: Observable<string[]>;
  minuteFilteredOptions: Observable<string[]>;

  ngOnInit() {
    this.setOptions();
    this.listenOnFilterChange();
  }

  private listenOnFilterChange() {
    this.hourFilteredOptions = this.formGroup
      .controls[this.hourControlName]
      .valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.hourOptions, value || '')),
      );

    this.minuteFilteredOptions = this.formGroup
      .controls[this.minutesControlName]
      .valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.minuteOptions, value || '')),
      );
  }

  private setOptions() {
    for (let i = 1; i <= 23; i++) {
      const option = i.toString().padStart(2, '0');
      this.hourOptions.push(option);
    }

    this.minuteOptions = ['00', '15', '30', '45'];
  }

  private _filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    return options
      .filter(option => option.toLowerCase().includes(filterValue));
  }
}
