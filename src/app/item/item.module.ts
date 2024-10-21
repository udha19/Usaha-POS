import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { RupiahPipe } from '../share/pipes/rupiah.pipe';
import { SeparatorDirective } from '../share/directives/thousand.directive';
import { DirectivesModule } from '../share/directives/directives.module';
import { ImageCropperComponent } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPageRoutingModule,
    RupiahPipe,
    SeparatorDirective,
    ImageCropperComponent
  ],
  declarations: [ItemPage],
})
export class ItemPageModule {}
