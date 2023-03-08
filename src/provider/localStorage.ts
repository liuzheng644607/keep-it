import { Provider } from '../typings';

export default class LocalStorageProvider implements Provider {
  private _cache = localStorage;

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


