import Storage from './store';
import LocalStorageProvider from './provider/localStorage';

export default new Storage(new LocalStorageProvider());

export { default as Storage } from './store';

export { default as LocalStorageProvider } from './provider/localStorage';
export { default as MemoryStorageProvider } from './provider/memoryStorage';
