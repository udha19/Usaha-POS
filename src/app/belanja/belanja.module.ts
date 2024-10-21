import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BelanjaPageRoutingModule } from './belanja-routing.module';

import { BelanjaPage } from './belanja.page';
import { SeparatorDirective } from '../share/directives/thousand.directive';
import { RupiahPipe } from '../share/pipes/rupiah.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BelanjaPageRoutingModule,
    RupiahPipe,
    SeparatorDirective,
  ],
  declarations: [BelanjaPage]
})
export class BelanjaPageModule {}
