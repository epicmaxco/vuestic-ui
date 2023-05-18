export class TempMap<Key, T> extends Map<Key, T> {
  timeoutId = -1

  set (key: Key, value: T) {
    if (this.timeoutId === -1) {
      this.timeoutId = setTimeout(() => {
        super.clear()
      }, 300) as any as number
    }
    return super.set(key, value)
  }
}
