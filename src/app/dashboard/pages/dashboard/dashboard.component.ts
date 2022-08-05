import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dashboard: DashboardService,
  ) {
  }

  ngOnInit() {
    if (!this.route.snapshot.paramMap.has('id')) {
      throw Error('Dashboard not found');
    }
    this.dashboard.id = this.route.snapshot.paramMap.get('id')!;
  }
}
