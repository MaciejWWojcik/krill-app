import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../app.module';

export enum StorageKey {
  Schedule = 'schedule',
}

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor(
    @Inject(BROWSER_STORAGE) private readonly storage: Storage,
  ) {
  }

  get(key: StorageKey): string | null {
    return this.storage.getItem(key);
  }

  set(key: StorageKey, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: StorageKey): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
