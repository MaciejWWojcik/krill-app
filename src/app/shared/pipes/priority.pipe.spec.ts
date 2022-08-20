import { PriorityPipe } from './priority.pipe';
import { render } from '@testing-library/angular';
import { Priority } from '../../models/priority';
import { fakeAsync } from '@angular/core/testing';

describe('PriorityPipe', () => {

  async function setup(priority: Priority) {

    const { fixture, container } = await render(`<p>{{ "${priority}" | priority}}</p>`, {
      declarations: [PriorityPipe],
    });

    return {
      fixture,
      container,
      element: fixture.nativeElement,
    }
  }

  it('displays "Low" for priority low', fakeAsync(async () => {
    const { element } = await setup(Priority.Low);

    const priority = element.textContent;

    expect(priority).toBe('Low');
  }));

  it('displays "Medium" for priority medium', fakeAsync(async () => {
    const { element } = await setup(Priority.Medium);

    const priority = element.textContent;

    expect(priority).toBe('Medium');
  }));

  it('displays "High" for priority high', fakeAsync(async () => {
    const { element } = await setup(Priority.High);

    const priority = element.textContent;

    expect(priority).toBe('High');
  }));

  it('displays "unknown" for unknown priority', fakeAsync(async () => {
    const { element } = await setup('OTHER' as Priority);

    const priority = element.textContent;

    expect(priority).toBe('unknown');
  }));

});
