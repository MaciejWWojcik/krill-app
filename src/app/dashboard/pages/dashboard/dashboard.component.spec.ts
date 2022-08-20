import { DashboardComponent } from './dashboard.component';
import { createSpyFromClass } from 'jest-auto-spies';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { getByText, render, screen } from '@testing-library/angular';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { DashboardService } from '../../../services/dashboard.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SiteWrapperComponent } from '../../../shared/components/site-wrapper/site-wrapper.component';

describe('DashboardComponent', () => {

  async function setup({ id = 'fake-id' } = {}) {
    const mockRoute = createSpyFromClass(ActivatedRoute, {
      gettersToSpyOn: ['snapshot'],
    });
    const mockSnapshot = createSpyFromClass(ActivatedRouteSnapshot, {
      gettersToSpyOn: ['paramMap'],
    });
    const mockDashboard = createSpyFromClass(DashboardService, {
      settersToSpyOn: ['id'],
    });

    mockRoute.accessorSpies.getters.snapshot.mockReturnValue(mockSnapshot)
    mockSnapshot.accessorSpies.getters.paramMap.mockReturnValue({
      get: () => id,
      has: () => !!id,
    });

    const { fixture, container } = await render(DashboardComponent, {
      declarations: [
        HeaderComponent,
        SiteWrapperComponent,
        FooterComponent,
      ],
      providers: [
        { provide: DashboardService, useValue: mockDashboard },
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
      component: fixture.componentInstance,
      dashboard: mockDashboard,
    }
  }

  it(' assigns id to dashboard', async () => {
    const { dashboard } = await setup();

    expect(dashboard.accessorSpies.setters.id).toHaveBeenLastCalledWith('fake-id');
  });

  it('throws error if id is not provided', async () => {
    await expect(setup({ id: '' })).rejects.toThrow('Dashboard not found');
  });

  it('renders title and footer', async () => {
    const { element } = await setup();

    const title = getByText(element, 'Krill Planner');
    const footer = getByText(element, 'Created by Jan & Maciej - 2022');

    expect(title).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

});
