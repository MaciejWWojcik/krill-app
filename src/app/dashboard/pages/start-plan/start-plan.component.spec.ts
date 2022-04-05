import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPlanComponent } from './start-plan.component';

describe('StartPlanComponent', () => {
  let component: StartPlanComponent;
  let fixture: ComponentFixture<StartPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
