import EventEmitter from "../event/EventEmitter";

type Event = {
  storage: (e: {
    key: string | null;
    newValue: string | null;
    oldValue: string | null;
  }) => void;
};

export abstract class Provider {
  eventEmitter = new EventEmitter<Event>();
  abstract setItem(key: string, value: string): void;
  abstract getItem(key: string): string | null;
  abstract removeItem(key: string): void;
  abstract forEach(callback: (key: string, value: any) => void): void;
}

export interface StoreValue {
  storageName: string;
  value: string;
  deadline?: number;
}
