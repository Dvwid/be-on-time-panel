import {Component} from '@angular/core';

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
export class MenuComponent {

  mainMenuItems: MenuItem[] = [
    {
      label: 'Strona główna',
      icon: 'home',
      routerLink: 'home'
    },
    {
      label: 'Wydarzenia',
      icon: 'star',
      routerLink: 'events'
    }
  ]

  preferencesMenuItems: MenuItem[] = [
    {
      label: 'Ustawienia',
      icon: 'settings',
      routerLink: 'settings'
    }
  ]
}
