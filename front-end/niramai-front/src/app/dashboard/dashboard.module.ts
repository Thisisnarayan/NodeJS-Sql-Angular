import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashPanelComponent } from './main-dash-panel/main-dash-panel.component';
import {SharedModule} from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainDashPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
