export default class EventEmitter<T extends Record<string | symbol, any>> {

  private readonly _listenerMap = new Map<keyof T, Array<(...args: any[]) => void>>();

  on<K extends keyof T>(event: K, listener: T[K]) {
    if (!this._listenerMap.has(event)) {
      this._listenerMap.set(event, []);
    }
    this._listenerMap.get(event)?.push(listener);
    return this;
  }

  off<K extends keyof T>(event: K, listener?: T[K]) {
    const listeners = this._listenerMap.get(event);
    if (!listener) {
      this._listenerMap.delete(event);
    } else if (listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    const listeners = this._listenerMap.get(event);
    if (!listeners || listeners.length === 0) return false;
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  once<K extends keyof T>(event: K, listener: T[K]) {
    const handler: any = (...args: any) => {
      listener(...args);
      this.off(event, handler);
    }
    this.on(event, handler);
    return this;
  }
}