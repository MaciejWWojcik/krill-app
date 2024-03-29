import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { StartPlanComponent } from './pages/start-plan/start-plan.component';
import { PlansComponent } from './pages/plans/plans.component';

const routes: Routes = [
  {
    path: ':id', component: DashboardComponent, children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'start', component: StartPlanComponent },
      { path: 'schedule', component: PlansComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
