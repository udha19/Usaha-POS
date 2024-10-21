import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransaksiPageRoutingModule } from './transaksi-routing.module';

import { TransaksiPage } from './transaksi.page';
import { RupiahPipe } from '../share/pipes/rupiah.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaksiPageRoutingModule,
    RupiahPipe
  ],
  declarations: [TransaksiPage]
})
export class TransaksiPageModule {}
