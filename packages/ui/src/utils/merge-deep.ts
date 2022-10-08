const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj)

/**
 * Merge objects deep
 * If property is array, it will replace target value
 */
export const mergeDeep = (target: any, source: any): any => {
  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}
