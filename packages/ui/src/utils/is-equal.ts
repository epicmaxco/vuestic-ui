import { isDate } from './is-date'

export const isEqual = <T>(a: T, b: T): boolean => {
  if (a === b) { return true }
  if (a == null || b == null) { return false }
  if (typeof a !== typeof b) { return false }

  if (isDate(a) && isDate(b)) {
    return a.getTime() === b.getTime()
  }

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) { return false }
    if (a.length !== b.length) { return false }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) { return false }
    }
    return true
  }

  if (typeof a === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) { return false }
    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual((a as any)[key], (b as any)[key])) {
        return false
      }
    }
    return true
  }

  return false
}
