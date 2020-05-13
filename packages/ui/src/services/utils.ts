//  @ts-nocheck

import { v4 as uuidv4 } from 'uuid'
import { isObject } from 'lodash'

export const sleep = (ms = 0) => {
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
  if (a === b) { return true }

  // If the values aren't objects, they were already checked for equality
  if (a !== Object(a) || b !== Object(b)) {
    return false
  }

  // Handle dates as a special case
  if (a instanceof Date && b instanceof Date) {
    if (a.getTime() !== b.getTime()) { return false }
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

// Find value in the object with an array of keys
export const getNestedValue = (option, propsArray) => {
  if (propsArray.length === 0) { return option }

  const nestedItem = option[propsArray[0]]
  if (!isObject(nestedItem)) {
    if (propsArray.length === 1) {
      return nestedItem
    }
    return undefined
  }
  return getNestedValue(nestedItem, propsArray.slice(1))
}

/**
 * Finds value in the object using string with dots 'key.key.key'
 *
 * @param option
 * @param prop
 */
export const getValueByPath = <T extends object>(option: T, prop: string | keyof T) => {
  if (prop in option) {
    return option[prop]
  }
  prop = prop.replace(/^\./, '') // remove first point symbol
  return getNestedValue(option, prop.split('.'))
}

/**
 * Finds value of nested property inside of an object.
 *
 * @param option - Object to look properties inside
 * @param prop - string or function used to find nested property
 */
export const getProp = <T extends (object | string)> (option: T, prop: string | ((t: T) => any)): any => {
  if (typeof option === 'string') { return }
  if (!prop || !option) { return option }
  if (typeof prop === 'string') { return getValueByPath(option, prop) }
  if (typeof prop === 'function') { return prop(option) }
  return option
}

export const generateUuid = () => uuidv4()
