import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../../notification/services/notification.service";
import {UserDto} from '../../dtos/UserDto';
import {BehaviorSubject, finalize, Subject} from "rxjs";
import {AuthGuard} from "../auth.guard";
import {Router} from "@angular/router";

enum FormTypeEnum {
  LOGIN = 'login',
  REGISTER = 'register'
}

@Component({
  selector: 'exam-testing-auth-form',
  templateUrl: './auth-form.component.html'
})
export class AuthFormComponent implements OnInit, OnDestroy {

  isRegistryFormDisplayed = false;
  showPassword = false;
  isRequestPending = false;

  authForm: FormGroup;

  formType$ = new BehaviorSubject<FormTypeEnum>(FormTypeEnum.LOGIN);
  destroy$ = new Subject<boolean>();

  constructor(private router: Router,
              private authGuard: AuthGuard,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.initializeAuthForm();
    this.listenOnFormTypeChange();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  submit() {
    if (!this.authForm?.valid) {
      return;
    }
    if (this.isRegistryFormDisplayed) {
      return this.register();
    }
    return this.login();
  }

  getErrorMessage(errors: ValidationErrors): string {
    if (errors?.['required']) {
      return 'Pole jest wymagane.'
    }

    if (errors?.['maxlength']) {
      return 'Nazwa jest zbyt długa.'
    }

    if (errors?.['minlength']) {
      return 'Hasło jest zbyt krótkie.'
    }

    if (errors?.['email']) {
      return 'Wprowadź poprawny adres e-mail.'
    }

    return '';
  }

  changeFormType() {
    this.isRegistryFormDisplayed = !this.isRegistryFormDisplayed;
    this.formType$.next(this.isRegistryFormDisplayed ? FormTypeEnum.REGISTER : FormTypeEnum.LOGIN);
  }

  private register() {
    this.isRequestPending = true;

    const req: Omit<UserDto, 'id'> = {
      email: this.authForm?.value?.email,
      password: this.authForm?.value?.password,
      name: this.authForm?.value?.name
    }

    this.authService
      .register(req)
      .pipe(finalize(() => this.isRequestPending = false))
      .subscribe((_) => {
        this.notificationService.success('Sukces!', 'Twoje konto zostało utworzone. Możesz się zalogować.', 3000);
        this.isRegistryFormDisplayed = false;
        this.formType$.next(FormTypeEnum.LOGIN);
      });
  }

  private login() {
    this.isRequestPending = true;

    const req: Pick<UserDto, 'email' | 'password'> = {
      email: this.authForm?.value?.email,
      password: this.authForm?.value?.password,
    }

    this.authService
      .login(req)
      .pipe(finalize(() => this.isRequestPending = false))
      .subscribe((data) => {
        localStorage.setItem('EXAM-JWT', data?.jwt);
        this.router.navigate(['']);
        this.notificationService.success('Sukces!', 'Logowanie przebiegło pomyślnie.', 3000);
      });
  }

  private initializeAuthForm() {
    this.authForm = new FormGroup({
      name: new FormControl<string | undefined>('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email: new FormControl<string | undefined>('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl<string | undefined>('', [
        Validators.required,
        Validators.minLength(8)
      ],)
    });
  }

  private listenOnFormTypeChange() {
    this.formType$
      .subscribe((type) => {
          if (type === FormTypeEnum.LOGIN) {
            this.authForm.get('name')?.disable();
          }
          if (type === FormTypeEnum.REGISTER) {
            this.authForm.get('name')?.enable();
          }
        }
      )
  }

}
