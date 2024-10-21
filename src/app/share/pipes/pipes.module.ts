import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RupiahPipe } from './rupiah.pipe';
import { ShortenPipe } from './shorten.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RupiahPipe,
    ShortenPipe
  ],
  exports: [
    RupiahPipe,
    ShortenPipe
  ]
})
export class PipesModule { }
