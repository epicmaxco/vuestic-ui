const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj)

/**
 * Merge objects deep
 * If property is array, it will replace target value
 */
export const mergeDeep = (target: any, source: any): any => {
  if (!isObject(target)) {
    target = {}
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (sourceValue instanceof RegExp || sourceValue instanceof Date) {
      target[key] = sourceValue
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.create(
        Object.getPrototypeOf(targetValue),
        Object.getOwnPropertyDescriptors(targetValue),
      ), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

export const mergeDeepMultiple = (...objects: any[]): any => {
  return objects.reduce((acc, obj) => mergeDeep(acc, obj), {})
}
