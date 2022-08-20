import { fakeAsync } from '@angular/core/testing';
import { daysDiff, getNextMonth } from './date-utils';

describe('daysDiff', () => {

  it('calculates diff between dates', fakeAsync(async () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2020, 0, 10);
    const result = daysDiff(start, end);

    expect(result).toBe(9);
  }));
});

describe('getNextMonth', () => {

  it('returns next month', fakeAsync(async () => {
    const date = new Date(2020, 0, 1);
    const result = getNextMonth(date);

    expect(result.getFullYear()).toBe(2020);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  }));

  it('returns next month for december', fakeAsync(async () => {
    const date = new Date(2020, 11, 1);
    const result = getNextMonth(date);

    expect(result.getFullYear()).toBe(2021);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  }));
});
