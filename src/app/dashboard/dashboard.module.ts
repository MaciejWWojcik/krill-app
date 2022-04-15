import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { PlansComponent } from './pages/plans/plans.component';
import { StartPlanComponent } from './pages/start-plan/start-plan.component';
import { PlanCreateComponent } from './components/plan-create/plan-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanComponent } from './components/plan/plan.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WelcomeComponent,
    PlansComponent,
    StartPlanComponent,
    PlanCreateComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule {
}
