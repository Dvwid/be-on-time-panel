import {Component, Input} from "@angular/core";
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {getErrorMessage} from "../../../core/utilities";

@Component({
  selector: '',
  template: '',
  standalone: true
})
export class FormFieldAbstractComponent {

  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() form: FormGroupDirective;

  showError(): string {
    return getErrorMessage(this.formGroup?.controls?.[this.controlName]?.errors);
  }
}
