import { Component, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, Subject } from 'rxjs';
import { RenderPlan, RenderPlanManager } from '../../functions/render-plan';
import { SchedulesApiService } from '../../../services/schedules-api.service';
import { DashboardService } from '../../../services/dashboard.service';
import { PlanCreateComponent } from '../../components/plan-create/plan-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  plans$: Observable<RenderPlan[]> | undefined;
  daySize: number = 0;
  startTime: Date = new Date();
  endTime: Date = new Date();

  constructor(
    private api: SchedulesApiService,
    private dashboard: DashboardService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.refreshPlans();
  }

  async onPlanCreate() {
    const dialogRef = this.dialog.open(PlanCreateComponent);

    const plan = await firstValueFrom(dialogRef.afterClosed());
    if (plan) {
      await firstValueFrom(this.api.createPlan(this.dashboard.id, plan));
      this.refreshPlans();
    }
  }

  onViewDetails(plan: RenderPlan) {
    console.log(plan);
  }

  onEdit(plan: RenderPlan) {
    console.log(plan);
  }

  onDelete(plan: RenderPlan) {
    console.log(plan);
  }

  onMarkAsCompleted(plan: RenderPlan) {
    console.log(plan);
  }

  private refreshPlans() {
    this.plans$ = this.api.getSchedule(this.dashboard.id).pipe(
      map(schedule => {
        const manager = new RenderPlanManager(schedule.events);
        this.daySize = manager.dayViewSize;
        this.startTime = manager.startView;
        this.endTime = manager.endView;
        return manager.toRender();
      }),
    );
  }

}
