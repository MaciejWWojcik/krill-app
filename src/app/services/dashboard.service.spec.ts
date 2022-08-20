import { DashboardService } from './dashboard.service';
import { createSpyFromClass } from 'jest-auto-spies';
import { BrowserStorageService, StorageKey } from './browser-storage.service';

describe('DashboardService', () => {
  function setup() {
    const storage = createSpyFromClass(BrowserStorageService);
    const service = new DashboardService(storage);

    return { service, storage };
  }

  it('sets id', () => {
    const { service, storage } = setup();
    service.id = 'value';

    expect(storage.set).toHaveBeenCalledWith(StorageKey.Schedule, 'value');
    expect(service.id).toBe('value');
  });

  it('gets id', () => {
    const { service } = setup();

    service.id = 'value';

    expect(service.id).toBe('value');
  });

  it('return empty string if id is not set', () => {
    const { service } = setup();

    expect(service.id).toBe('');
  });
});
