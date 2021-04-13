export function isMatchRegex (str: string, regex: RegExp) {
  return regex.test(str)
}

/**
 * Return values from regex groups
 * @example
 * ```
 * "fa-phone-o", /fa-(.*)-(.*)/ -> ["phone", "o"]
 * "any string", /(.*)/ -> ["any string"]
 * "global regex test", /global (regex) (test)/g -> [['regex', 'test']]
 * ```
 */
export function regexGroupsValues (str: string, regex: RegExp | string): string[] | string[][] {
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
