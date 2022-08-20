import { SchedulesApiService } from './schedules-api.service';
import { createSpyFromClass } from 'jest-auto-spies';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../models/schedule';
import { EventType } from '../models/event-type';
import { EventTimeType } from '../models/event-time-type';
import { Priority } from '../models/priority';
import { Plan } from '../models/plan';
import { CreatePlan } from '../models/create-plan';

describe('SchedulesApiService', () => {
  const mockPlan: Plan = {
    id: '1',
    title: 'Plan 1',
    icon: 'icon',
    type: EventType.OneTime,
    timeType: EventTimeType.Point,
    priority: Priority.High,
    date: '2020-01-01' as unknown as Date, // passing as string to check the conversion
    description: 'description',
    categories: [],
  };

  const mockEmptySchedule: Schedule = {
    scheduleId: 'fake-id',
    title: 'fake-title',
    events: [],
  };

  const mockFullSchedule: Schedule = {
    scheduleId: 'fake-id',
    title: 'fake-title',
    events: [mockPlan],
  };

  function setup() {
    const http = createSpyFromClass(HttpClient);
    const service = new SchedulesApiService(http);

    return { service, http };
  }

  it('creates a schedule', () => {
    const { service, http } = setup();

    http.post.nextWith(mockEmptySchedule);

    service.createSchedule().subscribe(schedule => expect(schedule).toEqual(mockEmptySchedule));
    expect(http.post).toHaveBeenCalledWith('http://localhost:8080/schedules', {});
  });

  it('gets a schedule', () => {
    const { service, http } = setup();

    http.get.nextWith(mockFullSchedule);

    service.getSchedule('fake-id').subscribe(schedule => {
      expect(schedule.scheduleId).toEqual(mockFullSchedule.scheduleId)
      expect(schedule.events[0].id).toEqual(mockPlan.id);
      expect(schedule.events[0].date).toEqual(new Date(''));
    });
    expect(http.get).toHaveBeenCalledWith('http://localhost:8080/schedules/fake-id');
  });

  it('creates a plan', () => {
    const { service, http } = setup();
    const mockCreationPlan = {} as CreatePlan;
    http.post.nextWith(mockPlan);

    service.createPlan('fake-id', mockCreationPlan).subscribe(plan => {
      expect(plan.id).toEqual(mockPlan.id);
      expect(plan.date).toEqual(new Date(''));
    });
    expect(http.post).toHaveBeenCalledWith('http://localhost:8080/schedules/fake-id/events', mockCreationPlan);
  });

});
