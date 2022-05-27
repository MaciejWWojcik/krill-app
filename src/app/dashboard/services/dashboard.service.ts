import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly idSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  get id(): string {
    return this.idSubject.value ?? '';
  }

  get id$(): Observable<string> {
    return this.idSubject.asObservable().pipe(
      filter(id => id !== null),
      map(id => id as string),
    );
  }

  set id(value: string) {
    this.idSubject.next(value);
  }
}
