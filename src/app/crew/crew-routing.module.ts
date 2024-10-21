import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrewPage } from './crew.page';

const routes: Routes = [
  {
    path: '',
    component: CrewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrewPageRoutingModule {}
