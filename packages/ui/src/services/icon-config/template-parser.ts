import { getRegexGroupValues, strictMatch } from './utils'

const templateGroupRegex = /{[^}]*}/g // match {any-thing}, {even with space}

/**
 * Replace {anything} to regex (.*) group
 * @example
 * ```
 * "fa-{code}" -> "fa-(.*)"
 * "fa-{code}-{suffix}" -> "fa-(.*)-(.*)"
 * ```
 */
function templateStringToRegex (template: string) {
  return template.replace(templateGroupRegex, '(.*)')
}

/**
 Returns content from string in {}
 @example
 ```
 "fa-{code}-{suffix}" -> ['code', 'suffix']
 ```
 */
function getTemplateParams (template: string) {
  return (template.match(templateGroupRegex) || []) // 'fa-{code}-{suffix}' -> ['{code}', '{suffix}']
    .map((g) => g.replace(/{|}/g, '')) // ['{code}', '{suffix}'] -> ['code', 'suffix']
}

/**
 * Transform template to regex and returns regex group values
 * @example
 * ```
 * "fa-clock-o", "fa-{code}-{suffix}" -> ["clock", "o"]
 * ```
 */
function getValues (str: string, template: string) {
  return getRegexGroupValues(str, templateStringToRegex(template))
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
export function paramsFromString (str: string, template: string) {
  const params = getTemplateParams(template)
  const values = getValues(str, template)

  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {})
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
export function matchTemplate (str: string, template: string) {
  const templateRegex = templateStringToRegex(template)
  return strictMatch(str, new RegExp(templateRegex))
}
