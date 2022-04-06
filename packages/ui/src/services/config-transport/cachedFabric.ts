const cache = new Map()

export const withCache = <T>(fabric: () => T, key: number | string): T => {
  const cached = cache.get(key)

  if (cached) {
    return cached
  }

  const result = fabric()

  cache.set(key, result)

  return result
}

export const getFromCache = <T>(key: string | number): T | undefined => {
  return cache.get(key)
}
