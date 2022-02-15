export const mapObject = <T, D, K extends string>(o: Record<K, T>, cb: (item: T, key: K) => D) => {
  const copy = {} as Record<K, D>

  (Object.keys(o) as K[])
    .forEach((key: K) => {
      copy[key] = cb(o[key], key)
    })

  return copy
}
