import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ShortenPipe } from "../share/pipes/shorten.pipe";
import { RupiahPipe } from '../share/pipes/rupiah.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    RupiahPipe,
],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
