import { dynamicSegments } from 'vuestic-ui/src/services/icon/utils/dynamic-segment'
import { regexGroupsValues } from 'vuestic-ui/src/services/icon/utils/regex'

/** Imitate JS execution with scope */
const callStringWithScope = (scope: Record<string, any>, code: string) => {
  const vars = Object.keys(scope).reduce((acc, key) => {
    return acc + `let ${key} = ${JSON.stringify(scope[key])};`
  }, '')

  if (!code) { return undefined }

  try {
    // eslint-disable-next-line no-new-func
    return new Function(`${vars};return (${code})`)()
  } catch (e) {
    return undefined
  }
}

const removeQuotes = (s: string) => {
  ['`', "'", '"'].forEach((a) => {
    if (s.startsWith(a) && s.endsWith(a)) {
      s = s.slice(1, -1)
    }
  })
  return s
}

export const getArgs = (iconName: string, configName: string) => {
  if (configName.startsWith('/') && configName.endsWith('/')) {
    return '[ ' + (regexGroupsValues(iconName, new RegExp(configName.slice(1, -1))) as string[])
      .filter(Boolean)
      .map((a, i) => `group${i}`)
      .reduce((acc, key) => `${acc} ${key},`, '').slice(0, -1) + ' ]'
  }

  const scope = Object.keys(dynamicSegments(iconName, configName) as Record<string, string>)

  return '{' + scope.reduce((acc, v) => `${acc} ${v},`, '').slice(0, -1) + ' }'
}

export const getScope = (iconName: string, configName: string) => {
  if (configName.startsWith('/') && configName.endsWith('/')) {
    const groups = regexGroupsValues(iconName, new RegExp(configName.slice(1, -1))) as string[]

    return groups.reduce((acc, group, index) => {
      acc[`group${index}`] = group
      return acc
    }, {} as Record<string, string>)
  }

  return dynamicSegments(iconName, configName) as Record<string, string>
}

export const parseConfig = (iconName: string, configName: string, resolve: {
  class: string,
  content: string,
  attrs: string,
  tag: string,
}) => {
  const scope = getScope(iconName, configName)

  return Object.entries(resolve).reduce((acc, [key, value]) => {
    const code = Object.entries(scope).reduce((acc, [key, value]) => {
      return acc.replaceAll(`\${${key}}`, value)
    }, value)

    acc[removeQuotes(key)] = callStringWithScope(scope, code)

    return acc
  }, {} as Record<string, any>)
}
