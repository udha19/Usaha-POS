import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinesPage } from './busines.page';

const routes: Routes = [
  {
    path: '',
    component: BusinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinesPageRoutingModule {}
