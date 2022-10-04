//  @ts-nocheck
import isObject from 'lodash/isObject.js'
import { __DEV__ } from '../utils/global-utils'

export const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms))
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
  if (__DEV__) {
    // eslint-disable-next-line  no-console
    console.warn(...attrs)
  }
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
export const getValueByPath = <T extends Record<string, unknown>>(option: T, prop: string | keyof T) => {
  if (prop in option) {
    return option[prop]
  }
  prop = prop.replace(/^\./, '') // remove first point symbol
  return getNestedValue(option, prop.split('.'))
}

/**
 * Finds value of nested property inside an object.
 *
 * @param option - Object to look properties inside.
 * @param prop - String or function used to find nested property.
 */
export const getValueByKey = <T extends Record<string, unknown>> (
  option: T,
  prop: string | ((option: T) => any),
): any => {
  if (!option || typeof option !== 'object' || Array.isArray(option)) { return undefined }

  if (!prop) { return option }
  if (typeof prop === 'string') { return getValueByPath(option, prop) }
  if (typeof prop === 'function') { return prop(option) }

  // if `prop` has different to string or function type and can't be processed
  return option
}

const getRandomString = (stringLength = 4): string => {
  return Math.random().toString(36).substring(2, stringLength + 2)
}

export const generateUniqueId = () => {
  return `${getRandomString(8)}-${getRandomString(4)}-${getRandomString(4)}`
}

export const isParsableMeasure = (value: unknown) => {
  if (typeof value === 'string') {
    return (!isNaN(+value) ||
      value.endsWith('px') ||
      value.endsWith('rem'))
  }
  return typeof value === 'number'
}

export const isParsablePositiveMeasure = (value: unknown) => {
  return isParsableMeasure(value) && parseInt(value) >= 0
}
