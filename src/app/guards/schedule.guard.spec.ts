import { ScheduleGuard } from './schedule.guard';
import { createSpyFromClass } from 'jest-auto-spies';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BrowserStorageService } from '../services/browser-storage.service';
import { DashboardService } from '../services/dashboard.service';

describe('ScheduleGuard', () => {

  function setup({ id = 'fake-id' } = {}) {
    const mockRouter = createSpyFromClass(Router);
    const mockStorage = createSpyFromClass(BrowserStorageService);
    const mockDashboard = createSpyFromClass(DashboardService, {
      settersToSpyOn: ['id'],
    });

    mockStorage.get.mockReturnValue(id);

    const guard = new ScheduleGuard(mockRouter, mockStorage, mockDashboard);

    return {
      guard,
      dashboard: mockDashboard,
      router: mockRouter,
    };
  }

  it('assigns id to dashboard', async () => {
    const { guard, dashboard } = setup();

    await guard.canActivate(createSpyFromClass(ActivatedRouteSnapshot), createSpyFromClass(RouterStateSnapshot));

    expect(dashboard.accessorSpies.setters.id).toHaveBeenLastCalledWith('fake-id');
  });

  it('allows to navigate if no id is provided', async () => {
    const { guard } = setup({ id: '' });

    const result = await guard.canActivate(createSpyFromClass(ActivatedRouteSnapshot), createSpyFromClass(RouterStateSnapshot));

    expect(result).toBe(true);
  });

  it('navigates to dashboard if id is provided', async () => {
    const { guard, router } = setup();

    await guard.canActivate(createSpyFromClass(ActivatedRouteSnapshot), createSpyFromClass(RouterStateSnapshot));

    expect(router.navigate).toHaveBeenLastCalledWith(['/dashboard', 'fake-id']);
  });

  it('assigns id to dashboard when activating child', async () => {
    const { guard, dashboard } = setup();

    await guard.canActivateChild(createSpyFromClass(ActivatedRouteSnapshot), createSpyFromClass(RouterStateSnapshot));

    expect(dashboard.accessorSpies.setters.id).toHaveBeenLastCalledWith('fake-id');
  });

  it('allows to navigate if no id is provided when activating child', async () => {
    const { guard } = setup({ id: '' });

    const result = await guard.canActivateChild(createSpyFromClass(ActivatedRouteSnapshot), createSpyFromClass(RouterStateSnapshot));

    expect(result).toBe(true);
  });

  it('navigates to dashboard if id is provided when activating child', async () => {
    const { guard, router } = setup();

    await guard.canActivateChild(createSpyFromClass(ActivatedRouteSnapshot), createSpyFromClass(RouterStateSnapshot));

    expect(router.navigate).toHaveBeenLastCalledWith(['/dashboard', 'fake-id']);
  });


});
