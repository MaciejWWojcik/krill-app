import { TestBed } from '@angular/core/testing';

import { SchedulesApiService } from './schedules-api.service';

describe('SchedulesApiService', () => {
  let service: SchedulesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
