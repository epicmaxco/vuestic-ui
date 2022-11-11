// TODO: @m0ksem: I think this is a thing that nobody will care about and we can delete this
export const hasOwnProperty = <
  KEYS extends string, KEY extends string, Values
>(object: Record<KEYS, Values>, key: string): object is Record<KEYS | KEY, Values> => {
  // See https://eslint.org/docs/rules/no-prototype-builtins for explanation
  // on why we don't use object.hasOwnProperty directly.
  return Object.prototype.hasOwnProperty.call(object, key)
}
