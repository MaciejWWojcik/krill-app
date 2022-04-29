import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePlan } from '../../models/create-plan';
import { formatPlan, Plan } from '../../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlansApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getPlans(): Observable<Plan[]> {
    const url = `${environment.api}/events/sample`;
    return of(plans);
    return this.http.get<Plan[]>(url).pipe(map(plans => plans.map(formatPlan)));
  }

  createPlan(plan: CreatePlan): Observable<any> {
    console.log('creating a plan', plan);
    return of(true);
  }
}

const plans: Plan[] = [
  {
    title: 'Plan 1',
    description: 'Description 1',
    date: new Date('04/15/2022')
  } as Plan,
  {
    title: 'Plan 2',
    description: 'Description 2',
    date: new Date('04/18/2022')
  } as Plan,
  {
    title: 'Plan 3',
    description: 'Description 3',
    date: new Date('04/20/2022'),
    endDate: new Date('04/26/2022')
  } as Plan,
  {
    title: 'Plan 4',
    description: 'Description 4',
    date: new Date('04/24/2022'),
    endDate: new Date('04/25/2022')
  } as Plan,
  {
    title: 'Plan 5',
    description: 'Description 5',
    date: new Date('05/01/2022')
  } as Plan,
  {
    title: 'Plan 6',
    description: 'Description 5',
    date: new Date('06/01/2022')
  } as Plan,
  {
    title: 'Plan 7',
    description: 'Description 5',
    date: new Date('07/01/2022'),
    endDate: new Date('07/31/2022')
  } as Plan,
  {
    title: 'Plan 8',
    description: 'Description 5',
    date: new Date('08/1/2022')
  } as Plan,
  {
    title: 'Plan 9',
    description: 'Description 5',
    date: new Date('08/05/2022')
  } as Plan,
]
