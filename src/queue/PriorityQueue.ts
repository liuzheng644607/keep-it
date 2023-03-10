export default class PriorityQueue<T> {

  _data: T[] = [];

  _compare: (a: T, b: T) => boolean;

  constructor(compare: (a: T, b: T) => boolean) {
    this._compare = compare;
  }
  /**
   * 二分查找 寻找插入位置
   * @param target 
   * @returns 
   */
  search(target: T) {
    let low = 0;
    let high = this._data.length;
    while (low < high) {
      let mid = low + ((high - low) >> 1);
      if (this._compare(this._data[mid], target)) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
  /**
   * 添加
   * @param elem 
   * @returns 
   */
  push(elem: T) {
    let index = this.search(elem);
    this._data.splice(index, 0, elem);
    return this._data.length;
  }
  /**
   * 取出最优元素
   * @returns
   */
  pop() {
    return this._data.pop();
  }
  /**
   * 查看最优元素
   * @returns 
   */
  peek() {
    return this._data[this._data.length - 1];
  }
}
