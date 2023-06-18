import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomepageComponent } from "./homepage.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
