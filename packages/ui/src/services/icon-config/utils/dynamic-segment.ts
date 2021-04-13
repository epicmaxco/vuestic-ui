import { regexGroupsValues } from './regex'

const dynamicSegmentRegex = /{[^}]*}/g // match {any-thing}, {even with space}

/**
 * Replace {anything} to regex (.*) group
 * @example
 * ```
 * "fa-{code}" -> "fa-(.*)"
 * "fa-{code}-{suffix}" -> "fa-(.*)-(.*)"
 * ```
 */
function dynamicSegmentStringToRegex (template: string) {
  return template.replace(dynamicSegmentRegex, '(.*)')
}

/**
 Returns content from string in {}
 @example
 ```
 "fa-{code}-{suffix}" -> ['code', 'suffix']
 ```
 */
function dynamicSegmentsNames (template: string) {
  return (template.match(dynamicSegmentRegex) || []) // 'fa-{code}-{suffix}' -> ['{code}', '{suffix}']
    .map((g) => g.replace(/{|}/g, '')) // ['{code}', '{suffix}'] -> ['code', 'suffix']
}

/**
 * Transform template to regex and returns regex group values
 * @example
 * ```
 * "fa-clock-o", "fa-{code}-{suffix}" -> ["clock", "o"]
 * ```
 */
function dynamicSegmentsValues (str: string, template: string) {
  return regexGroupsValues(str, dynamicSegmentStringToRegex(template))
}

/**
 * Returns object with param name from template and match value from str
 * @example
 * ```
 * "fa-phone", "fa-{icon code}" -> { 'icon code': 'phone' }
 * "fa4 clock-o", "fa4 {icon-code}-{suffix}" -> { 'icon-code': 'clock', 'suffix': 'o' }
 * "fa4 clock-o", "fa4 {icon-code}" -> { 'icon-code': 'clock-o' }
 * ```
 */
export function dynamicSegments (str: string, template: string) {
  const params = dynamicSegmentsNames(template)
  const values = dynamicSegmentsValues(str, template)

  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {})
}

/**
 * Returns true if match string equals to input `str`
 * @example
 * ```
 * "vuestic-home-open", /vuestic-(.*)-o/ -> false
 * "vuestic-home-open", /vuestic-(.*)-open/ -> true
 * ```
 */
function strictMatch (str: string, regex: RegExp) {
  return (str.match(regex) || [])[0] === str
}

/**
 * Returns true if str match template
 * @example
 *  ```
 * "fa-phone", "fa-{icon code}" -> true
 * "fa4 clock-o", "fa4 {icon-code}-{suffix}" -> true
 * "fa4 clock-o", "fa4 {icon-code}" -> false
 * ```
 */
export function isMatchDynamicSegments (str: string, template: string) {
  const templateRegex = dynamicSegmentStringToRegex(template)
  return strictMatch(str, new RegExp(templateRegex))
}
