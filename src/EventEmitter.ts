export default class EventEmitter<T extends Record<string | symbol, any>> {

  listenerMap = new Map<keyof T, Array<(...args: any[]) => void>>();

  on<K extends keyof T>(event: K, listener: T[K]) {
    if (!this.listenerMap.has(event)) {
      this.listenerMap.set(event, []);
    }
    this.listenerMap.get(event)?.push(listener);
    return this;
  }

  off<K extends keyof T>(event: K, listener: T[K]) {
    const listeners = this.listenerMap.get(event);
    if (listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    const listeners = this.listenerMap.get(event);
    if (!listeners || listeners.length === 0) return false;
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  once<K extends keyof T>(event: K, listener: T[K]) {
    const handler: any = (...args: any) => {
      this.off(event, handler);
      listener(...args);
    }
    this.on(event, handler);
    return this;
  }
}