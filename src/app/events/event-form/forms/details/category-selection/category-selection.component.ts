import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  SelectAbstractComponent
} from "../../../../../shared/components/form-fields/select/select-abstract.component";
import {EventCategoryDto} from "../../../../../core/dtos/EventCategoryDto";
import {EventDetailsFormGroup} from "../../../../../core/dtos/EventForm";
import {MaterialModule} from "../../../../../core/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: '../../../../../shared/components/form-fields/select/select-abstract-directive.component.html',
  styleUrls: ['../../../../../shared/components/form-fields/select/select-abstract-directive.component.scss']
})
export class CategorySelectionComponent extends SelectAbstractComponent<EventCategoryDto, EventDetailsFormGroup> {

}
