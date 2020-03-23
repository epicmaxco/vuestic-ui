export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const normalizeValue = (value, minValue = 0, maxValue = 100) => {
  if (value <= minValue) {
    return minValue
  }

  if (value >= maxValue) {
    return maxValue
  }

  return value
}

// Taken from vuetify pretty much.
export const deepEqual = (a, b) => {
  if (a === b) return true

  // If the values aren't objects, they were already checked for equality
  if (a !== Object(a) || b !== Object(b)) {
    return false
  }

  // Handle dates as a special case
  if (a instanceof Date && b instanceof Date) {
    if (a.getTime() !== b.getTime()) return false
  }

  const props = Object.keys(a)

  // Different number of props, don't bother to check
  if (props.length !== Object.keys(b).length) {
    return false
  }

  return props.every(p => deepEqual(a[p], b[p]))
}

// vuestic-ui warn, currently is mostly a placeholder, but later might provide ability to disable warns etc.
export const warn = (...attrs) => {
  // eslint-disable-next-line  no-console
  console.warn(...attrs)
  return false
}

export const hasOwnProperty = (object, key) => {
  // See https://eslint.org/docs/rules/no-prototype-builtins for explanation
  // on why we don't use object.hasOwnProperty directly.
  return Object.prototype.hasOwnProperty.call(object, key)
}

export const getNestedValue = (option, propsArray) => {
  const lastPropIndex = propsArray.length - 1
  if (lastPropIndex < 0) return option

  let nestedObj = option[propsArray[0]]

  for (let i = 1; i < lastPropIndex; i++) {
    if (nestedObj === null) {
      return option
    }
    nestedObj = nestedObj[propsArray[i]]
  }

  if (nestedObj === null) return option

  return nestedObj[propsArray[lastPropIndex]]
}

export const getValueByPath = (option, prop) => {
  if (option === null || typeof prop !== 'string' || !prop) return option
  if (option[prop] !== undefined) return option[prop]
  prop = prop.replace(/^\./, '') // remove first point symbol
  return getNestedValue(option, prop.split('.'))
}

export const getProp = (option, prop) => {
  if (!prop) return option
  if (typeof prop === 'string') return getValueByPath(option, prop)
  if (typeof prop === 'function') return prop(option)
  return option
}
