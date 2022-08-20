import { StartPlanComponent } from './start-plan.component';
import { createSpyFromClass, Spy } from 'jest-auto-spies';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { fireEvent, getByText, render } from '@testing-library/angular';
import { SchedulesApiService } from '../../../services/schedules-api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fakeAsync, tick } from '@angular/core/testing';
import { CreatePlan } from '../../../models/create-plan';
import { PlanCreateComponent } from '../../components/plan-create/plan-create.component';

describe('StartPlanComponent', () => {
  async function setup() {
    const mockRoute = createSpyFromClass(ActivatedRoute);
    const mockApi = createSpyFromClass(SchedulesApiService);
    const mockRouter = createSpyFromClass(Router);
    const mockDialog: Spy<MatDialog> = createSpyFromClass(MatDialog);
    const mockDashboard = createSpyFromClass(DashboardService, {
      gettersToSpyOn: ['id'],
    });

    mockDashboard.accessorSpies.getters.id.mockReturnValue('fake-id');

    const { fixture, container } = await render(StartPlanComponent, {
      providers: [
        { provide: DashboardService, useValue: mockDashboard },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: SchedulesApiService, useValue: mockApi },
      ]
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
      component: fixture.componentInstance,
      api: mockApi,
      router: mockRouter,
      route: mockRoute,
      dialog: mockDialog,
    }
  }

  it('renders header and CTA', async () => {
    const { element } = await setup();

    const header = getByText(element, 'Start by creating your first plan.');
    const cta = getByText(element, 'Create a plan');

    expect(header).toBeInTheDocument();
    expect(cta).toBeInTheDocument();
  });

  it('creates a new plan', fakeAsync(async () => {
    const { element, router, route, api, dialog } = await setup();
    const mockPlan = {} as CreatePlan;
    const mockDialog = createSpyFromClass(MatDialogRef);

    dialog.open.mockReturnValue(mockDialog);
    mockDialog.afterClosed.nextWith(mockPlan);
    api.createPlan.nextWith(void 0);

    const cta = getByText(element, 'Create a plan');

    fireEvent.click(cta);
    tick();

    expect(dialog.open).toHaveBeenLastCalledWith(PlanCreateComponent);
    expect(api.createPlan).toHaveBeenLastCalledWith('fake-id', mockPlan);
    expect(router.navigate).toHaveBeenLastCalledWith(['../schedule'], { relativeTo: route });
  }));

  it('does not create a new plan if dialog is cancelled', fakeAsync(async () => {
    const { element, router, route, api, dialog } = await setup();
    const mockDialog = createSpyFromClass(MatDialogRef);

    dialog.open.mockReturnValue(mockDialog);
    mockDialog.afterClosed.nextWith(null);
    api.createPlan.nextWith(void 0);

    const cta = getByText(element, 'Create a plan');

    fireEvent.click(cta);
    tick();

    expect(dialog.open).toHaveBeenLastCalledWith(PlanCreateComponent);
    expect(api.createPlan).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
