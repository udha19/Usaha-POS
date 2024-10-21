import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpacePageRoutingModule } from './space-routing.module';

import { SpacePage } from './space.page';
import { ComponentsModule } from "../share/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpacePageRoutingModule,
    ComponentsModule
],
  declarations: [SpacePage]
})
export class SpacePageModule {}
