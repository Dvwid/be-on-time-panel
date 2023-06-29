import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "../../../core/material/material.module";
import { MapboxWrapperComponent } from './mapbox-wrapper.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    MapboxWrapperComponent,
  ],
  exports: [
    MaterialModule,
    MapboxWrapperComponent
  ]
})
export class GoogleMapWrapperModule {
}
