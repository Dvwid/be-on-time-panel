import {Injectable} from '@angular/core';
import {AjaxService} from "../../ajax.service";
import {BehaviorSubject, Observable} from "rxjs";
import {UserDto} from "../../dtos/UserDto";
import {UserCredentialsDto} from "../../dtos/UserCredentialsDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'auth';

  currentUser$ = new BehaviorSubject<UserDto>(undefined);

  constructor(private _ajaxService: AjaxService) {
  }

  login(req: Pick<UserDto, 'email' | 'password'>): Observable<UserCredentialsDto> {
    return this._ajaxService.doPost<UserCredentialsDto>(`${this.baseUrl}/login`, req);
  }

  register(req: Omit<UserDto, 'id'>): Observable<UserDto> {
    return this._ajaxService.doPost<UserDto>(`${this.baseUrl}/register`, req);
  }

  verifyToken(token: string) {
    return this._ajaxService.doPost<UserDto>(`${this.baseUrl}/verify`, {token});
  }

}
