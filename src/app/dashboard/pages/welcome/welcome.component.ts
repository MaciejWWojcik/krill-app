import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  dashboardUrl!: string;

  constructor(
    private dashboard: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = this.dashboard.id;
    this.dashboardUrl = `${environment.app}/dashboard/${id}`;
  }

  complete() {
    void this.router.navigate(['../start'], { relativeTo: this.route });
  }
}
