import { TestBed } from '@angular/core/testing';

import { PlansApiService } from './plans-api.service';

describe('PlansApiService', () => {
  let service: PlansApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
