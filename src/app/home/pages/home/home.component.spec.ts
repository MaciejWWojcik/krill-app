import { HomeComponent } from './home.component';
import { fireEvent, getByRole, getByText, render } from '@testing-library/angular';
import { createSpyFromClass } from 'jest-auto-spies';
import { SchedulesApiService } from '../../../services/schedules-api.service';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { fakeAsync } from '@angular/core/testing';
import { Schedule } from '../../../models/schedule';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  const mockSchedule = { scheduleId: 'fake-id' } as Schedule;

  async function setup() {
    const mockApi = createSpyFromClass(SchedulesApiService);
    mockApi.createSchedule.nextWith(mockSchedule);

    const mockRouter = createSpyFromClass(Router);

    const { fixture, container } = await render(HomeComponent, {
      declarations: [
        FooterComponent,
      ],
      providers: [
        { provide: SchedulesApiService, useValue: mockApi },
        { provide: Router, useValue: mockRouter },
      ]
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
      component: fixture.componentInstance,
      api: mockApi,
      router: mockRouter,
    }
  }


  it('displays welcome content and CTA', async () => {
    const { element } = await setup();

    const header = getByText(element, 'Krill Planner');
    const content = getByText(element, 'Plan your chores!');
    const cta = getByText(element, 'Start');
    const image = getByRole(element, 'img', { name: 'krill logo' });

    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(cta).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('displays app footer', fakeAsync(async () => {
    const { element } = await setup();

    const footer = getByText(element, 'Created by Jan & Maciej - 2022');

    expect(footer).toBeInTheDocument();
  }));

  it('creates schedule and navigates to dashboard on CTA click', fakeAsync(async () => {
    const { element, api, router } = await setup();

    const cta = getByText(element, 'Start');

    fireEvent.click(cta);
    expect(api.createSchedule).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard', mockSchedule.scheduleId, 'welcome']);
  }));

});
