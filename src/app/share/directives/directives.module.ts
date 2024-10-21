import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeparatorDirective } from './thousand.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeparatorDirective
  ],
  exports: [SeparatorDirective]
})
export class DirectivesModule { }
