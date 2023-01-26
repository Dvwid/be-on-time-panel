import {Injectable} from '@angular/core';
import {AjaxService} from "../../ajax.service";
import {Observable} from "rxjs";
import {UserDto} from "../../dtos/UserDto";
import {UserCredentialsDto} from "../../dtos/UserCredentialsDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'auth';

  constructor(private ajaxService: AjaxService) {
  }

  login(req: Pick<UserDto, 'email' | 'password'>): Observable<UserCredentialsDto> {
    return this.ajaxService.doPost<UserCredentialsDto>(`${this.baseUrl}/login`, req);
  }

  register(req: Omit<UserDto, 'id'>): Observable<UserDto> {
    return this.ajaxService.doPost<UserDto>(`${this.baseUrl}/register`, req);
  }

  verifyToken(token: string) {
    return this.ajaxService.doPost<UserDto>(`${this.baseUrl}/verify`, {token});
  }

}
