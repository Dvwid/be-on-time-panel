import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {UserDto} from "../dtos/UserDto";
import {Subject, takeUntil} from "rxjs";

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  #authService = inject(AuthService);

  destroy$ = new Subject<boolean>();

  mainMenuItems: MenuItem[] = [
    {
      label: 'Strona główna',
      icon: 'home',
      routerLink: 'home'
    },
    {
      label: 'Wydarzenia',
      icon: 'event_note',
      routerLink: 'events'
    },
  ];


  preferencesMenuItems: MenuItem[] = [
    {
      label: 'Ustawienia',
      icon: 'settings',
      routerLink: 'settings'
    }
  ]

  user: UserDto;

  ngOnInit() {
    this.listenOnUserChange();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  logout() {
    this.#authService.currentUser$.next(undefined);
    localStorage.removeItem('EXAM-JWT');
    window.location.reload();
  }

  private listenOnUserChange() {
    this.#authService
      .currentUser$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((user) => this.user = user);
  }
}
