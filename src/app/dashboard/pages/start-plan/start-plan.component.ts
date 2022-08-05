import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanCreateComponent } from '../../components/plan-create/plan-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SchedulesApiService } from '../../../services/schedules-api.service';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-start-plan',
  templateUrl: './start-plan.component.html',
  styleUrls: ['./start-plan.component.scss']
})
export class StartPlanComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dashboard: DashboardService,
    private api: SchedulesApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  async createPlan() {
    const dialogRef = this.dialog.open(PlanCreateComponent);

    const plan = await firstValueFrom(dialogRef.afterClosed());
    if (plan) {
      await firstValueFrom(this.api.createPlan(this.dashboard.id, plan));
    }
    await this.router.navigate(['../schedule'], { relativeTo: this.route });
  }

}
