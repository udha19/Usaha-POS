import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinesPageRoutingModule } from './busines-routing.module';

import { BusinesPage } from './busines.page';
import { ComponentsModule } from "../share/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinesPageRoutingModule,
    ComponentsModule
],
  declarations: [BusinesPage]
})
export class BusinesPageModule {}
