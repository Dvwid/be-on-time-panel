import {Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./services/auth.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  async canActivate() {
    const token = localStorage.getItem('EXAM-JWT');

    if (token) {
      const user = await firstValueFrom(this.verifyToken(token));

      if (!user) {
        this.router.navigate(['auth']);
        return false
      }
      if (user) {
        this.authService.currentUser$.next(user);
        return true;
      }
    }
    this.router.navigate(['auth']);
    return false;
  }

  private verifyToken(token: string) {
    return this.authService.verifyToken(token);
  }

}
