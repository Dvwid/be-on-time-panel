import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PanelAuthComponent} from "./panel-auth.component";

const routes: Routes = [
  {path: 'auth', component: PanelAuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAuthRoutingModule {
}
