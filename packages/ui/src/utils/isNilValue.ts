const nilValues = [null, undefined, '' as const]
const nullOrUndefined = [null, undefined]

/**
 * Checks if provided value not exists.
 *
 * @param value any value to check it.
 */
export const isNilValue = (value: any): value is null | undefined | '' => {
  // lodash `isNil` isn't an alternative, because we also want to handle empty string values
  return nilValues.includes(value)
}

export const notNil = <T>(value: T): value is NonNullable<T> => !isNilValue(value)

export const isNil = (value: any): value is null | undefined => {
  return nullOrUndefined.includes(value)
}
