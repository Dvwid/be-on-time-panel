import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
