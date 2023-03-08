export abstract class Provider {
  abstract setItem(key: string, value: string): void;
  abstract getItem(key: string): string | null;
  abstract removeItem(key: string): void;
  abstract forEach(callback: (key: string, value: any) => void): void;
}

export interface StoreValue {
  storageName: string;
  value: string,
  deadline?: number,
}