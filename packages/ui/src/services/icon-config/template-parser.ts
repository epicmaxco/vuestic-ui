import { getRegexGroups } from './utils'

const templateGroupRegex = /{[^}]*}/g // match {any-thing}, {even with space}

function templateStringToRegex (template: string) {
  return template.replace(templateGroupRegex, '(.*)')
}

/** Returns content from string in {} */
function getTemplateParams (template: string) {
  return (template.match(templateGroupRegex) || []) // 'fa-{code}-{suffix}' -> ['{code}', '{suffix}']
    .map((g) => g.replace(/{|}/g, '')) // ['{code}', '{suffix}'] -> ['code', 'suffix']
}

/** Transform template to regex and returns regex group values */
function getValues (str: string, template: string) {
  return getRegexGroups(str, templateStringToRegex(template))
}

/** Returns object with param name from template and match value from str */
export function paramsFromString (str: string, template: string) {
  const params = getTemplateParams(template)
  const values = getValues(str, template)

  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {})
}

function strictMatch (str: string, regex: RegExp) {
  return (str.match(regex) || [])[0] === str
}

export function matchTemplate (str: string, template: string) {
  const templateRegex = templateStringToRegex(template)

  return strictMatch(str, new RegExp(templateRegex))
}
