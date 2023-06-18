import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  innerWidth$ = new BehaviorSubject<number>(0);
  mobileViewActive$ = new BehaviorSubject<boolean>(false);

  constructor() { }

}
