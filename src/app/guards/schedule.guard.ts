import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserStorageService, StorageKey } from '../services/browser-storage.service';
import { DashboardService } from '../services/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private storage: BrowserStorageService,
    private dashboard: DashboardService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.emptySchedule();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.emptySchedule();
  }

  private async emptySchedule(): Promise<boolean> {
    const schedule = this.storage.get(StorageKey.Schedule);

    if (!schedule) {
      return true;
    }

    this.dashboard.id = schedule;
    await this.router.navigate(['/dashboard', schedule]);
    return false
  }

}
