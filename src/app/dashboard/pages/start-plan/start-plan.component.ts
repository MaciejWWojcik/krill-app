import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanCreateComponent } from '../../components/plan-create/plan-create.component';

@Component({
  selector: 'app-start-plan',
  templateUrl: './start-plan.component.html',
  styleUrls: ['./start-plan.component.scss']
})
export class StartPlanComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  createPlan() {
    this.dialog.open(PlanCreateComponent);
    // TODO redirect to /plans on plan create
  }

}
