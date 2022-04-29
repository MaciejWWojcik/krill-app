import { Component, OnInit } from '@angular/core';
import { PlansApiService } from '../../services/plans-api.service';
import { map, Observable } from 'rxjs';
import { RenderPlan, RenderPlanManager } from '../../functions/render-plan';

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
    private api: PlansApiService,
  ) {
  }

  ngOnInit(): void {
    this.plans$ = this.api.getPlans().pipe(
      map(plans => {
        const manager = new RenderPlanManager(plans);
        this.daySize = manager.dayViewSize;
        this.startTime = manager.startView;
        this.endTime = manager.endView;
        return manager.toRender();
      }),
    );
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

}
