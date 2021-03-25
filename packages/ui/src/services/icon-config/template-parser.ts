import { getRegexGroups } from './utils'

const templateGroupRegex = /{[^}]*}/g // match {any-thing}, {even with space}

/** Returns content from string in {} */
function getTemplateParams (template: string) {
  return (template.match(templateGroupRegex) || []) // 'fa-{code}-{suffix}' -> ['{code}', '{suffix}']
    .map((g) => g.replace(/{|}/g, '')) // ['{code}', '{suffix}'] -> ['code', 'suffix']
}

/** Transform template to regex and returns regex group values */
function getValues (str: string, template: string) {
  const templateRegex = template.replace(templateGroupRegex, '(.*)')
  return getRegexGroups(str, templateRegex)
}

/** Returns object with param name from template and match value from str */
export function paramsFromString (str: string, template: string) {
  const params = getTemplateParams(template)
  const values = getValues(str, template)

  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {})
}
