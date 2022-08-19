import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrowserStorageService, StorageKey } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly idSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  get id(): string {
    return this.idSubject.value ?? '';
  }

  set id(value: string) {
    this.idSubject.next(value);
    this.storage.set(StorageKey.Schedule, value);
  }

  constructor(
    private storage: BrowserStorageService,
  ) {
  }

}
