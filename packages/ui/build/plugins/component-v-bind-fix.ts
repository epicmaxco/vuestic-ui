import { Plugin } from 'vite'
import kebabCase from 'lodash/kebabCase'
import { type SFCParseResult, parse } from 'vue/compiler-sfc'
import MagicString from 'magic-string'

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
const getVBinds = (sfc: SFCParseResult) => {
  return sfc.descriptor.cssVars
}

/** Returns start and end indexes of v-bind used in style */
const getStyleVBindLocs = (source: string, vBind: string) => {
  const vBindEscaped = vBind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Regex for v-bind(color), v-bind('color'), v-bind("color")
  const regex = new RegExp(`v-bind\\(['|"]?${vBindEscaped}['|"]?\\)`, 'gm')
  const indexes = [] as { start: number, end: number }[]
  let match

  // The same variable can be used multiple times vBind in css
  // replace all of them until there are no more matches
  while ((match = regex.exec(source)) !== null) {
    indexes.push({ start: match.index, end: match.index + match[0].length })
  }

  return indexes
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
 * Returns loc for `<va-button>`
 */
const getRootNodesOpenTags = (sfc: SFCParseResult) => {
  const ast = sfc.descriptor.template?.ast
  const rootNodes = ast?.children.filter(node => node.type === 1 /* ELEMENT */)

  return rootNodes?.map(({ loc }) => {
    const openTag = loc.source.match(/<[^>]*>/)?.[0]
    if (!openTag) { return undefined }

    return {
      ...loc,
      end: { ...loc.start, offset: loc.start.offset + openTag.length },

      source: openTag,
    }
  })
}

const renderCSSVariableName = (vBind: string) => {
  return `--va-${kebabCase(vBind)}`
}

const renderCssVariablesAsStringCode = (vBinds: string[]) => {
  return vBinds.map((vBind, index) => {
    return `${renderCSSVariableName(vBind)}: \${String(${vBind})}`
  }, '').join(';')
}

const renderObjectGuardCode = (existingContent: string, binds: string[]) => {
  const renderedAsString = renderCssVariablesAsStringCode(binds)

  // Handle if style is an object, array or string
  return `[${existingContent}, \`${renderedAsString}\`]`
}

const addStyleAttrToTag = (rootNode: string, vBinds: string[]) => {
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

export const transformVueComponent = (code: string) => {
  const sfc = parse(code)

  const vBinds = getVBinds(sfc)
  if (!vBinds.length) { return }

  const rootNodes = getRootNodesOpenTags(sfc)
  if (!rootNodes?.length) { return }

  const s = new MagicString(code)

  rootNodes?.forEach((nodeOpenTag) => {
    if (!nodeOpenTag) { return }

    const newStartTagCode = addStyleAttrToTag(nodeOpenTag.source, vBinds)

    s.overwrite(nodeOpenTag.start.offset, nodeOpenTag.end.offset, newStartTagCode)
  })

  vBinds.forEach((vBind, index) => {
    const locs = getStyleVBindLocs(s.original, vBind)

    locs.forEach((loc) => {
      s.overwrite(loc.start, loc.end, `var(${renderCSSVariableName(vBind)})`)
    })
  })

  return {
    code: s.toString(),
    map: s.generateMap(),
  }
}

/** We need this plugin to support CSS vbind in SSR. Vue useCssVars is disabled for cjs build */
export const componentVBindFix = (o: {
  sourcemap?: boolean
} = { sourcemap: false }) => {
  return {
    name: 'vuestic:component-v-bind-fix',
    enforce: 'pre',
    transform (code, id) {
      if (!/\.vue$/.test(id)) {
        return
      }

      const result = transformVueComponent(code)

      if (o.sourcemap) {
        return result
      }

      return result?.code
    },
  } satisfies Plugin
}
