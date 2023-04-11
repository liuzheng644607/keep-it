import EventEmitter from "../event/EventEmitter";
import { Provider, StoreValue } from "../typings";
// import PriorityQueue from '../queue/PriorityQueue';

const DEFAULT_NAME_SPACE = "ns-storage-hub";
const DEFAULT_STORAGE_NAME = "LNE8L2IIABS";

export default class Storage<T extends Record<string, any>,
  P extends Provider = Provider
> extends EventEmitter<{
  // expired: (key: string, value: any) => void;
  // removed: (key: string, value: any) => void;
  // added: (key: string, value: any) => void;
}> {
  readonly provider: P;

  readonly namespace: string;

  readonly KEY_SEPARATOR = '/';

  // private readonly _queue = new PriorityQueue<StoreValue>((a, b) => {
  //   if (a.deadline && b.deadline) {
  //     return a.deadline < b.deadline;
  //   }
  //   return false;
  // });

  constructor(
    provider: P,
    namespace: string = DEFAULT_NAME_SPACE
  ) {
    super();
    this.provider = provider;
    this.namespace = namespace;
    this._checkAll();
  }

  private get _now() {
    return Date.now();
  }

  private _getWrapperValue(fullKey: string) {
    const storeWrapper = this.provider.getItem(fullKey);
    let wrapperItem: StoreValue | null = null;
    try {
      if (storeWrapper !== null) {
        wrapperItem = JSON.parse(storeWrapper);
      }
    } catch (e) {
      console.error(e);
    }
    return wrapperItem;
  }

  private _getItemByFullKey(fullKey: string) {
    const storeWrapper = this._getWrapperValue(fullKey);
    let value = null;
    try {
      if (storeWrapper !== null) {
        value = JSON.parse(storeWrapper?.value);
      }
    } catch (e) {
      console.error(e);
    }
    return value;
  }

  private _checkExpiresByFullKey(fullKey: string) {
    const key = fullKey;
    const storeValue = this._getWrapperValue(key);
    if (!storeValue || storeValue.storageName !== DEFAULT_STORAGE_NAME) {
      return false;
    }
    if (storeValue.deadline && this._now >= storeValue.deadline) {
      return true;
    }
    return false;
  }

  private _loopNamespace(cbk: (fullKey: string) => void) {
    this.provider.forEach((key) => {
      const regexp = new RegExp(`^${this.namespace}`, "ig");
      if (regexp.test(key)) {
        cbk(key);
      }
    });
  }

  private _checkAll() {
    this._loopNamespace((key: string) => {
      const isExpires = this._checkExpiresByFullKey(key);
      if (isExpires) {
        this._removeItemByFullKey(key);
      }
    });
  }

  private _makeStoreValue(value: string, expires?: number): StoreValue {
    return {
      value,
      deadline: expires ? this._now + expires : undefined,
      storageName: DEFAULT_STORAGE_NAME,
    };
  }

  private _removeItemByFullKey(key: string) {
    if (!key) return;
    this.provider.removeItem(key);
  }

  private _getStorageKey(k: string) {
    return `${this.namespace}${this.KEY_SEPARATOR}${k}`;
  }

  /**
   * 获取存储
   * @param k
   * @returns
   */
  getItem<K extends keyof T = string>(k: K): T[K] | null {
    if (!this.provider) return null;
    if (!k) return null;
    const key = this._getStorageKey(k as string);
    const isExpires = this._checkExpiresByFullKey(key);
    if (isExpires) {
      this._removeItemByFullKey(key);
      return null;
    } else {
      return this._getItemByFullKey(key);
    }
  }

  /**
   * 增加存储
   * @param k key
   * @param value 要存的值
   * @param expires 多少毫秒后过期
   */
  setItem<K extends keyof T = string>(k: K, value: T[K], options?: {
    expires?: number
  }) {
    const { expires } = options || {};
    const key = this._getStorageKey(k as string);
    let val = value as string;
    // include null
    val = JSON.stringify(value);
    const storeValue = this._makeStoreValue(val, expires);
    const storeWrapper = JSON.stringify(storeValue);
    this.provider.setItem(key, storeWrapper);
  }

  /**
   * 删除某一项
   * @param k
   * @returns
   */
  removeItem<K extends keyof T = string>(k: K) {
    if (!k) return;
    const key = this._getStorageKey(k as string);
    this._removeItemByFullKey(key);
  }

  /**
   * 清除数据
   */
  clear() {
    this._loopNamespace((fullKey) => {
      this._removeItemByFullKey(fullKey);
    })
  }
}
