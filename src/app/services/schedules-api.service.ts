import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { formatSchedule, Schedule, ScheduleId } from '../models/schedule';
import { CreatePlan } from '../models/create-plan';
import { formatPlan, Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class SchedulesApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  createSchedule(): Observable<Schedule> {
    const url = `${environment.api}/schedules`;
    return this.http.post<Schedule>(url, {}).pipe(
      map(formatSchedule),
    );
  }

  getSchedule(id: ScheduleId): Observable<Schedule> {
    const url = `${environment.api}/schedules/${id}`;
    return this.http.get<Schedule>(url).pipe(
      map(formatSchedule),
    );
  }

  createPlan(id: ScheduleId, plan: CreatePlan): Observable<Plan> {
    const url = `${environment.api}/schedules/${id}/events`;
    return this.http.post<Plan>(url, plan).pipe(
      map(formatPlan),
    );
  }
}
