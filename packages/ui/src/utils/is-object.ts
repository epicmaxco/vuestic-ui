/** Returns true if `obj` is object and not null */
export const isObject = (obj: unknown): obj is Record<string, any> => {
  return obj !== null && typeof obj === 'object'
}
