import { isObject } from './is-object'

// Notice: structureClone can not copy DOM nodes and functions.
/** Deeply merge object into new object, cloning DOM nodes and functions */
export const cloneDeep = <T>(source: T): T => {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (Array.isArray(source)) {
    return source.map(cloneDeep) as any
  }

  if (source instanceof Date) {
    return new Date(source.getTime()) as any
  }

  if (isObject(source)) {
    return Object.keys(source).reduce((acc, key) => {
      acc[key] = cloneDeep(source[key as keyof T])
      return acc
    }, {} as any) as T
  }

  if (typeof source === 'function') {
    return source
  }

  return source
}
