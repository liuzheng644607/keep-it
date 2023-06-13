import { Provider } from '../typings';

export default class LocalStorageProvider extends Provider  {
  private _cache = localStorage;

  constructor() {
    super();
    this.attachEvent();
  }

  private handleStorageChange(event: StorageEvent) {
    const { key, oldValue, newValue } = event;
    this.eventEmitter.emit('storage', { key, oldValue, newValue });
  }

  private attachEvent() {
    window.addEventListener('storage', this.handleStorageChange)
  }

  setItem(key: string, value: string) {
    return this._cache.setItem(key, value);
  }

  getItem(key: string) {
    return this._cache.getItem(key);
  }

  removeItem(key: string) {
    return this._cache.removeItem(key);
  }

  forEach(callback: (key: string, value: any) => void): void {
    const length = this._cache.length;
    for (let index = 0; index < length; index++) {
      const key = this._cache.key(index);
      if (key !== null) {
        callback?.(key, this._cache.getItem(key));
      }
    }
  }
}


