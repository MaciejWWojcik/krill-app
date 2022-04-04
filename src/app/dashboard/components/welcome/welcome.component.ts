import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  dashboardUrl!: string;

  constructor(
    private dashboard: DashboardService,
  ) {
  }

  ngOnInit(): void {
    const id = this.dashboard.id;
    this.dashboardUrl = `${environment.app}/dashboard/${id}`;
  }

  complete() {

  }
}
