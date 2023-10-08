import {Component, inject, OnInit} from '@angular/core';
import {ControlContainer, FormGroupDirective} from "@angular/forms";
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventDetailsFormGroup} from "../../../../core/dtos/EventForm";
import {EventService} from "../../../services/event.service";
import {BehaviorSubject, finalize} from "rxjs";
import {EventCategoryDto} from "../../../../core/dtos/EventCategoryDto";

@Component({
  selector: 'app-event-details-form',
  templateUrl: './event-details-form.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class EventDetailsFormComponent extends EventFormAbstractComponent<EventDetailsFormGroup> implements OnInit {

  #eventService = inject(EventService);

  areCategoriesLoading$ = new BehaviorSubject(false);

  categories: EventCategoryDto[];
  showDateTo: boolean = false;

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.areCategoriesLoading$.next(true);

    this.#eventService
      .getCategories()
      .pipe(finalize(() => this.areCategoriesLoading$.next(false)))
      .subscribe((categories) => this.categories = categories || []);
  }
}
