import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from './core/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoginPage = true;
  opened = true;
  sidenavMode: 'over' | 'side' = 'side';

  private destroy$ = new Subject<boolean>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setInnerWidth();
  }

  get isMobileView():boolean {
    return this.globalService.mobileViewActive$.value;
  }

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  ngOnInit() {
    this.listenOnRouterEvents();
    this.setInnerWidth();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private listenOnRouterEvents() {
    this.router
      .events
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data instanceof NavigationEnd) {
          this.isLoginPage = data?.url?.includes('auth');
        }
      })
  }

  private setInnerWidth() {
    this.globalService.innerWidth$.next(window.innerWidth);
    this.setViewOptions();
  }

  private setViewOptions() {
    if (this.globalService.innerWidth$.value <= 1024) {
      this.globalService.mobileViewActive$.next(true);
      this.opened = false;
      this.sidenavMode = 'over';
      return;
    }

    this.globalService.mobileViewActive$.next(false);
    this.sidenavMode = 'side';
    this.opened = true;
  }
}
