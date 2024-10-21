import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrewPageRoutingModule } from './crew-routing.module';

import { CrewPage } from './crew.page';
import { UnavailableComponent } from '../share/components/unavailable/unavailable.component';
import { ComponentsModule } from '../share/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CrewPageRoutingModule
  ],
  declarations: [CrewPage]
})
export class CrewPageModule {}
