import { Plugin } from 'vite'
import kebabCase from 'lodash/kebabCase'

/**
 * Parse css and extract all variable names used in `v-bind`
 *
 * @example
 *
 * ```css
 * .va-button {
 *  color: v-bind(colorComputed);
 *  background-color: v-bind(getBg());
 * }
 * ```
 *
 * Returns`['colorComputed', 'getBg()']`
 */
const parseCssVBindCode = (style: string) => {
  return style
    .match(/v-bind\((.*)\)/g)
    ?.map((line) => line.match(/v-bind\(([^)]*)\)/)![1]) ?? []
}

/**
 * @example
 *
 * ```html
 * <template>
 *   <va-button>
 *     Hello
 *   </va-button>
 * </template>
 * ```
 * Returns `<va-button>`
 */
const getRootNodeOpenTagCode = (code: string) => {
  const template = code.match(/<template[^>]*>([\s\S]*)<\/template>/)?.[1]
  const rootNode = template?.match(/<[^>]*>/)?.[0]
  return rootNode
}

const renderCssVariablesAsStringCode = (vBinds: string[]) => {
  return vBinds.map((vBind, index) => {
    return `--va-${index}-${kebabCase(vBind)}: \${String(${vBind})}`
  }, '').join(';')
}

const renderCssVariablesAsObjectPropertiesCode = (vBinds: string[]) => {
  return vBinds.map((vBind, index) => {
    return `'--va-${index}-${kebabCase(vBind)}': String(${vBind})`
  }, '').join(',')
}

const renderObjectGuardCode = (existingContent: string, binds: string[]) => {
  const renderedAsString = renderCssVariablesAsStringCode(binds)
  const renderedAsObjectProperties = renderCssVariablesAsObjectPropertiesCode(binds)

  // Merge existing style with rendered css variables
  const arrayStyle = `[...${existingContent}, \`${renderedAsString}\`]`
  const objectStyle = `{ ...${existingContent}, ${renderedAsObjectProperties} }`
  const stringStyle = `${existingContent} + \`;${renderedAsString}\``

  // Handle if style is an object, array or string
  return `typeof ${existingContent} === 'object' ? (Array.isArray(${existingContent}) ? ${arrayStyle} : ${objectStyle}) : ${stringStyle}`
}

const addStyleToRootNode = (rootNode: string, vBinds: string[]) => {
  const [vBindCode, vBindContent] = rootNode?.match(/:style="([^"]*)"/) || []
  const [attrCode, attrContent] = rootNode?.match(/[^:]style="([^"]*)"/) || []
  const cssVariablesString = renderCssVariablesAsStringCode(vBinds)

  // If style attr already exists add css variables to it
  if (vBindContent) {
    // If :style already exists add a object guard here, because we're not sure if it is string, object or array.
    return rootNode.replace(/:style="([^"]*)"/, `:style="${renderObjectGuardCode(vBindContent, vBinds)}"`)
  }

  if (attrContent) {
    // If style already exists as string attribute, append css variables string to it
    return rootNode.replace(/style="([^"]*)"/, `:style="\`$1;${cssVariablesString}\`"`)
  }

  // Add :style to root node, because it doesn't exist yet
  // Replace `/>` or `>` with :style="..."/> or :style="..."> respectively
  return rootNode.replace(/(\/?>)$/, ` :style="\`${cssVariablesString}\`"$1`)
}

/** Replace each v-bind() with var(--va-index-name) */
const replaceVueVBindWithCssVariables = (code: string, vBinds: string[]) => {
  vBinds.forEach((vBind, index) => {
    try {
      code = code.replace(new RegExp(`v-bind\\(${vBind}\\)`, 'gm'), `var(--va-${index}-${kebabCase(vBind)})`)
    } catch (e) {
      console.log(vBind)
      throw e
    }
  })

  return code
}

export const transformVueComponent = (code: string) => {
  const style = code.match(/<style[^>]*>([\s\S]*)<\/style>/)
  if (!style) { return }

  const vBinds = parseCssVBindCode(style[0])
  if (!vBinds.length) { return }

  const rootNode = getRootNodeOpenTagCode(code)
  if (!rootNode) { throw new Error('Root node not found in template') }

  code = replaceVueVBindWithCssVariables(code, vBinds)

  return code.replace(rootNode, addStyleToRootNode(rootNode, vBinds))
}

export const componentVBindFix = (): Plugin => {
  return {
    name: 'vuestic:component-v-bind-fix',
    enforce: 'pre',
    transform (code, id) {
      if (!/\.vue$/.test(id)) {
        return
      }

      return transformVueComponent(code)
    },
  }
}
