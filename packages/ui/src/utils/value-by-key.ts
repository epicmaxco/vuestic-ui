import isObject from 'lodash/isObject.js'

import { isNilValue } from './isNilValue'

type GetTypeByPath<T extends Record<string, any>, K extends string> =
K extends keyof T
    ? T[K]
    : K extends `${infer TKey}.${infer Rest}`
        ? GetTypeByPath<T[TKey], Rest>
        : undefined

/**
 * Resolve the path to the target property inside the provided object.
 *
 * @param option - Object to look properties inside.
 * @param propsArray - Ordered array of strings, where each string should correspond to one of the property names at the current level of the object.
 */
export const getNestedValue = (option: Record<string, any>, propsArray: string[]): any => {
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
 * @param option - Object to look properties inside.
 * @param prop - String that contains a path to the property.
 */
export const getValueByPath = <
  Key extends string, T extends Record<string | Key, unknown>
>(option: T, prop: string | Key): GetTypeByPath<T, Key> => {
  if (prop in option) {
    return (option)[prop] as GetTypeByPath<T, Key>
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
export const getValueByKey = <
  Option extends Record<string, unknown>, R
>(
    option: Option | string | boolean | number | ((...args: any[]) => any),
    prop: string | ((option: Option) => R),
  ) => {
  if (isNilValue(option) || typeof option !== 'object' || Array.isArray(option)) { return undefined }

  if (!prop) { return option }
  if (typeof prop === 'string') { return getValueByPath(option, prop) }
  if (typeof prop === 'function') { return prop(option) }

  // if `prop` has different to string or function type and can't be processed
  return option
}
