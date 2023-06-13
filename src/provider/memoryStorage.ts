import { Provider } from "../typings";

export default class MemoryStorage extends Provider {
  private _cache = new Map<string, string>();

  setItem(key: string, newValue: string) {
    const oldValue = this._cache.get(key);
    this._cache.set(key, newValue);
    this.eventEmitter.emit("storage", {
      key,
      newValue,
      oldValue: oldValue === void 0 ? null : oldValue,
    });
  }

  getItem(key: string) {
    const value = this._cache.get(key);
    return value === undefined ? null : value;
  }

  removeItem(key: string) {
    const oldValue = this._cache.get(key);
    this._cache.delete(key);
    this.eventEmitter.emit("storage", {
      key,
      newValue: null,
      oldValue: oldValue === void 0 ? null : oldValue,
    });
  }

  forEach(callback: (key: string, value: any) => void): void {
    this._cache.forEach((value, k) => {
      callback(k, value);
    });
  }
}
