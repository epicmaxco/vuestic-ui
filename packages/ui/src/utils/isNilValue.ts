/**
 * Checks if provided value not exists.
 *
 * @param value any value to check it.
 */
export const isNilValue = (value: any): value is null | undefined | '' => {
  // lodash `isNil` isn't an alternative, because we also want to handle empty string values
  return [null, undefined, ''].includes(value)
}
