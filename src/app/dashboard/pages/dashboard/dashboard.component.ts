import { Component, OnInit } from '@angular/core';
import { EventsApiService } from '../../services/events-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events$!: Observable<any>;

  constructor(
    private events: EventsApiService,
  ) {
  }

  ngOnInit(): void {
    this.events$ = this.events.getEvents();
  }

}
