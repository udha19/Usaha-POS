import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KasirPageRoutingModule } from './kasir-routing.module';

import { KasirPage } from './kasir.page';
import { RupiahPipe } from '../share/pipes/rupiah.pipe';
import { SeparatorDirective } from '../share/directives/thousand.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KasirPageRoutingModule,
    RupiahPipe,
    SeparatorDirective
  ],
  declarations: [KasirPage]
})
export class KasirPageModule {}
