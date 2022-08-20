import { WelcomeComponent } from './welcome.component';
import { createSpyFromClass } from 'jest-auto-spies';
import { ActivatedRoute, Router } from '@angular/router';
import { getByText, getByTitle, render } from '@testing-library/angular';
import { DashboardService } from '../../../services/dashboard.service';

describe('WelcomeComponent', () => {

  async function setup() {
    const mockDashboard = createSpyFromClass(DashboardService, {
      gettersToSpyOn: ['id'],
    });
    const mockRouter = createSpyFromClass(Router);
    const mockRoute = createSpyFromClass(ActivatedRoute);

    mockDashboard.accessorSpies.getters.id.mockReturnValue('fake-id');

    const { fixture, container } = await render(WelcomeComponent, {
      providers: [
        { provide: DashboardService, useValue: mockDashboard },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
      component: fixture.componentInstance,
      router: mockRouter,
      route: mockRoute,
      dashboard: mockDashboard,
    }
  }

  it('creates dashboard url', async () => {
    const { component } = await setup();

    const url = `http://localhost:4200/dashboard/fake-id`;

    expect(component.dashboardUrl).toBe(url);
  });

  it('displays welcome content, url and CTA', async () => {
    const { element } = await setup();

    const content = getByText(element, 'Hey');
    const cta = getByText(element, 'I understand');
    const link = getByTitle(element, 'Link to your dashboard');

    expect(content).toBeInTheDocument();
    expect(cta).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('http://localhost:4200/dashboard/fake-id');
  });

  it('navigates to dashboard on CTA click', async () => {
    const { element, router, route } = await setup();

    const cta = getByText(element, 'I understand');
    cta.click();

    expect(router.navigate).toHaveBeenCalledWith(['../start'], { relativeTo: route });
  });

});
