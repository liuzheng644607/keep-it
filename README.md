# storage-hub

一个web本地存储工具

## install

```bash
npm i storage-hub
```

## examples

### basic
```typescript
import StorageHub, { LocalStorageProvider, MemoryStorageProvider } from 'storage-hub';

type StoreKV = {
  name: string;
  age: number;
  favorite?: Record<string, any>[];
}

const myStorageHub = new StorageHub<StoreKV>(new LocalStorageProvider);

myStorageHub.setItem('name', 'lily');
myStorageHub.setItem('age', 10);
myStorageHub.setItem('favorite', [{ type: '😄'}],  { expires: 24 * 60 * 60 * 1000 });


```