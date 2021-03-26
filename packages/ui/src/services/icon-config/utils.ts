
/**
 * Return values from regex groups
 * @example
 * ```
 * "fa-phone-o", /fa-(.*)-(.*)/ -> ["phone", "o"]
 * "any string", /(.*)/ -> ["any string"]
 * "global regex test", /global (regex) (test)/g -> [['regex', 'test']]
 * ```
 */
export function getRegexGroupValues (str: string, regex: RegExp | string): string[] | string[][] {
  if (typeof regex !== 'string' && regex.global) {
    // Global regex can return multiple matches array. So we need to map this all matches and remove non group values.
    return [...str.matchAll(regex)].map(g => g.slice(1))
  }

  const match = str.match(regex) || []
  if (!match) { return [] }
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

/**
 * Returns true if match string equals to input `str`
 * @example
 * ```
 * "vuestic-home-open", /vuestic-(.*)-o/ -> false
 * "vuestic-home-open", /vuestic-(.*)-open/ -> true
 * ```
 */
export function strictMatch (str: string, regex: RegExp) {
  return (str.match(regex) || [])[0] === str
}

/**
 * Copy object properties if its not undefined
 * @example
 * ```
 * { name: 'test', age: undefined} -> { name: 'test' }
 * ```
 */
export function copyObjectWithoutUndefined (obj: any) {
  return Object.keys({ ...obj }).reduce((acc, key) => {
    return obj[key] !== undefined ? { [key]: obj[key], ...acc } : acc
  }, {})
}
