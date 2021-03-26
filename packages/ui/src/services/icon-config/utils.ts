export function getRegexGroups (str: string, regex: RegExp | string): string[] {
  const match = str.match(regex)

  if (!match) { return [] }
  if (typeof regex === 'string') { return match }
  if (regex.global) { return match }
  /**
   * If there is groups in result - we need to slice first match
   * ```
   * "test".match(/(s)/)
   * > Array [ "s", "s" ]
   * ```
   */
  if (match.length > 1) { return match.slice(1) }

  return match
}

export function copyObjectWithoutUndefined (obj: any) {
  return Object.keys({ ...obj }).reduce((acc, key) => {
    return obj[key] !== undefined ? { [key]: obj[key], ...acc } : acc
  }, {})
}
