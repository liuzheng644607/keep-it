import { Provider } from '../typings';

export default class MemoryStorage implements Provider {
  private _cache = new Map<string, string>();

  setItem(key: string, value: string) {
    this._cache.set(key, value);
  }

  getItem(key: string) {
    const value = this._cache.get(key);
    return value === undefined ? null : value;
  }

  removeItem(key: string) {
    this._cache.delete(key);
  }

  forEach(callback: (key: string, value: any) => void): void {
    this._cache.forEach((value, k) => {
      callback(k, value);
    })
  }
}