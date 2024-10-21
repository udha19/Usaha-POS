import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnavailableComponent } from './unavailable/unavailable.component';



@NgModule({
  declarations: [
    UnavailableComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UnavailableComponent
  ]
})
export class ComponentsModule { }
