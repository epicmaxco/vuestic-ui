export const useAccessTrap = <BindName extends string, Value>(defaults: Record<BindName, Value>) => {
  const binded: string[] = []

  /** If key accessed in trap, it will not be accessable in untrapped */
  const trap = new Proxy(defaults, {
    get (target, key: BindName) {
      binded.push(key)
      return target[key]
    },
  })

    /** If key hasn't been accessed from trap it will be available in untrapped */
  const untrapped = new Proxy(defaults, {
    get (target, key: BindName) {
      if (binded.includes(key)) { return }
      return target[key]
    },
    ownKeys () {
      return Object.keys(defaults).filter((key) => !binded.includes(key))
    },
  })

  return {
    trap,
    untrapped,
  }
}
