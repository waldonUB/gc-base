/**
 * 最近使用缓存算法
 * 未满足力扣的所有测试用例 // todo waldon
 * @author waldon
 * @date 2022-02-25
 */
class LRUCache {
  constructor(max) {
    this.max = max
    this.data = new Map()
  }

  get(key) {
    if (!this.data.has(key)) {
      return -1
    }
    const _value = this.data.get(key)
    this.data.delete(key)
    this.data.set(key, _value)
    return _value
  }

  put(key, value) {
    if (this.data.size >= this.max) {
      let deleteKey
      if (this.data.has(key)) {
        deleteKey = key
      } else {
        deleteKey = this.data.keys().next().value
      }
      this.data.delete(deleteKey)
    }
    this.data.set(key, value)
  }
}

const cache = new LRUCache(2)
cache.get(2)
cache.put(2, 6)
cache.get(1)
cache.put(1, 5)
cache.put(1, 2)
console.log(cache.get(1))
console.log(cache.get(2))
