/**
 * Checks if provided value not exists.
 *
 * @param value any value to check it.
 */
export const isNilValue = (value: any): value is null | undefined | '' => {
  return [null, undefined, ''].includes(value)
}

export const isNil = (value: any): value is null | undefined => {
  return [null, undefined].includes(value)
}
