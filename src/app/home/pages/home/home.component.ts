import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulesApiService } from '../../../services/schedules-api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private api: SchedulesApiService,
  ) {
  }

  ngOnInit(): void {
  }

  start() {
    this.api.createSchedule().pipe(
      tap(schedule => this.router.navigate([`/dashboard/${schedule.scheduleId}/welcome`]))
    ).subscribe();
  }
}
