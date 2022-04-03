import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
}
