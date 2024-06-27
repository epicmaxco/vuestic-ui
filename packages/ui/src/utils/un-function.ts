import { isFunction } from './is-function'

/**
 * Return function result if function provided
 * Returns itself if not a function
 */
export const unFunction = <
  T,
  ARGS extends any[] = T extends (...args: infer A) => any ? A : never,
>(
    fn: T,
    ...args: ARGS
  ): T extends (...args: any[]) => infer R ? R : T => {
  if (isFunction(fn)) {
    return fn(...args) as any
  }

  return fn as any
}
