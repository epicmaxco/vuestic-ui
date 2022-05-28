export const useTempMap = <Key extends object, T extends any>(timeout = 16) => {
  let map = new WeakMap()
  let timeoutId = -1

  const clear = () => {
    timeoutId = -1
    map = new WeakMap()
  }

  const set = (key: Key, value: T) => {
    if (timeoutId === -1) {
      timeoutId = setTimeout(() => {
        clear()
      }, timeout) as any as number
    }
    map.set(key, value)
  }

  const get = (key: Key) => { return map.get(key) as T }

  return {
    set, get,
  }
}
