import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BelanjaPage } from './belanja.page';

const routes: Routes = [
  {
    path: '',
    component: BelanjaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BelanjaPageRoutingModule {}
