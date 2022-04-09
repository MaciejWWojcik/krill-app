import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateEvent } from '../../models/create-event';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getEvents(): Observable<any> {
    const url = `${environment.api}/events/sample`;
    return this.http.get(url);
  }

  createEvent(event: CreateEvent): Observable<any> {
    console.log('creating an event', event);
    return of(true);
  }
}
