import { ObjectOrGetter } from './types/object-or-getter'

export const getObject = <T extends object, P>(objectOrGetter: ObjectOrGetter<T, P>, baseProps: P) => {
  if (typeof objectOrGetter === 'function') {
    return objectOrGetter(baseProps)
  }

  return objectOrGetter
}
