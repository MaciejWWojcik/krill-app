import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulesApiService } from '../../../services/schedules-api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private api: SchedulesApiService,
  ) {
  }

  start() {
    this.api.createSchedule().pipe(
      tap(schedule => this.router.navigate(['/dashboard', schedule.scheduleId, 'welcome']))
    ).subscribe();
  }
}
