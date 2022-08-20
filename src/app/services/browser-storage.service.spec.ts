import { BrowserStorageService, StorageKey } from './browser-storage.service';
import { createSpyFromClass } from 'jest-auto-spies';

describe('BrowserStorageService', () => {
  function setup() {
    const storage = createSpyFromClass(Storage);
    const service = new BrowserStorageService(storage);

    return { service, storage };
  }

  it('gets value from storage', () => {
    const { service, storage } = setup();
    storage.getItem.mockReturnValue('value');

    expect(service.get(StorageKey.Schedule)).toBe('value');
    expect(storage.getItem).toHaveBeenCalledWith(StorageKey.Schedule);
  });

  it('sets value in storage', () => {
    const { service, storage } = setup();
    service.set(StorageKey.Schedule, 'value');

    expect(storage.setItem).toHaveBeenCalledWith(StorageKey.Schedule, 'value');
  });

  it('removes value from storage', () => {
    const { service, storage } = setup();
    service.remove(StorageKey.Schedule);

    expect(storage.removeItem).toHaveBeenCalledWith(StorageKey.Schedule);
  });

  it('clears storage', () => {
    const { service, storage } = setup();
    service.clear();

    expect(storage.clear).toHaveBeenCalled();
  });
});
