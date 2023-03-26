import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoginPage = true;

  constructor(@Inject(DOCUMENT) private readonly document: Document,
              private router: Router) {
  }

  ngOnInit() {
    this.listenOnRouterEvents();
  }

  private listenOnRouterEvents() {
    this.router.events.subscribe(data => {
        if (data instanceof NavigationEnd) {
          this.isLoginPage = data?.url?.includes('auth');
        }
      }
    )
  }
}
