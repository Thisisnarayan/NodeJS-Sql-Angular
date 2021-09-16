import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashPanelComponent } from './main-dash-panel/main-dash-panel.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashPanelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
