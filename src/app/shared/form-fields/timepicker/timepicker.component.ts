import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

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
export class TimepickerComponent {

  hourControl = new FormControl('');
  minuteControl = new FormControl('');

  hourOptions: string[] = [];
  minuteOptions: string[] = [];

  hourFilteredOptions: Observable<string[]>;
  minuteFilteredOptions: Observable<string[]>;

  ngOnInit() {
    this.setOptions();
    this.listenOnFilterChange();
  }

  private listenOnFilterChange() {
    this.hourFilteredOptions = this.hourControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.hourOptions, value || '')),
    );

    this.minuteFilteredOptions = this.minuteControl.valueChanges.pipe(
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
