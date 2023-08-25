import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/services/auth.service";
import {UserDto} from "../core/dtos/UserDto";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  currentUser: UserDto;

  #authService = inject(AuthService);

  ngOnInit() {
    this.currentUser = this.#authService.currentUser$.value;
  }
}
