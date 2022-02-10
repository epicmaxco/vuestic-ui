export const mapObject = <T, D>(o: Record<string, T>, cb: (item: T, key: keyof typeof o) => D) => {
  const copy = {} as Record<string, D>

  Object
    .keys(o)
    .forEach((key) => {
      copy[key] = cb(o[key], key)
    })

  return copy
}
