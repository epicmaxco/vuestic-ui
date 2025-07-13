import MagicString from 'magic-string'
import { getContentInParenthesis, omitComments, replaceOrAddConfigPropertyValue } from './code'

const CREATE_APP_TEMPLATE = 'createApp(App)'

type Code = string | MagicString
const createMagicString = (code: Code) => {
  return typeof code === 'string' ? new MagicString(code) : code
}

export const addImport = (originalCode: Code, code: string) => {
  const ms = createMagicString(originalCode)
  ms.appendLeft(0, code + '\n')
  return ms
}

export const hasImport = (originalCode: Code, from: string | { from: string, named: string }) => {
  const ms = createMagicString(originalCode)
  if (typeof from === 'string') {
    const importRegex = new RegExp(`import\\s+.*?\\s+from\\s+['"]${from}['"]`)
    return importRegex.test(ms.original)
  }

  if (typeof from === 'object' && from.from && from.named) {
    const importRegex = new RegExp(`import\\s+.*?\\s+from\\s+['"]${from.from}['"]\\s*{\\s*${from.named}\\s*}`)
    return importRegex.test(ms.original)
  }

  return false
}

export const hasVuePlugin = (originalCode: Code, pluginName: string) => {
  const ms = createMagicString(originalCode)
  const pluginRegex = new RegExp(`\\.use\\(${pluginName}\\(`)
  return pluginRegex.test(omitComments(ms.original))
}

/**
 * Add devtools plugin to the Vue app
 */
export const addVuePlugin = (originalCode: Code, code: string) => {
  const ms = createMagicString(originalCode)

  const createAppIndex = ms.original.indexOf(CREATE_APP_TEMPLATE)

  if (createAppIndex === -1) {
    throw new Error('createApp not found')
  }

  ms.appendRight(createAppIndex + CREATE_APP_TEMPLATE.length, `.use(${code})`)

  return ms
}

export const mergeVuesticPluginConfigOption = (originalCode: Code, pluginName: string, content: string = '') => {
  const ms = createMagicString(originalCode)

  const createPluginCode = `\.use\(${pluginName}\(`
  const existingPluginIndex = ms.original.indexOf(createPluginCode)

  if (existingPluginIndex === -1) {
    return null
  }

  const nextCode = ms.original.slice(existingPluginIndex + createPluginCode.length - 1)

  const contentInParenthesis = getContentInParenthesis(nextCode)

  let newCode

  if (contentInParenthesis) {
    newCode = replaceOrAddConfigPropertyValue(contentInParenthesis, content)
  } else {
    newCode = `{ config: ${content} }`
  }

  // const newCode = replaceOrAddConfigPropertyValue(contentInParenthesis, content)

  return ms
    .remove(existingPluginIndex, existingPluginIndex + createPluginCode.length + contentInParenthesis.length + 2)
    .appendLeft(existingPluginIndex + createPluginCode.length, `.use(${pluginName}(${newCode}))`)
}

export const compileCode = (ms: MagicString | string) => {
  if (typeof ms === 'string') {
    return { code: ms }
  }

  return {
    code: ms.toString(),
    map: ms.generateMap()
  }
}
