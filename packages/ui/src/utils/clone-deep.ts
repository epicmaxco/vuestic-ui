import { mergeDeep } from './merge-deep'

// Notice: structureClone can not copy DOM nodes and functions.
/** Deeply merge object into new object, cloning DOM nodes and functions */
export const cloneDeep = <T>(value: T) => {
  if (value === null || typeof value !== 'object') {
    return value
  }

  return mergeDeep({}, value) as T
}
