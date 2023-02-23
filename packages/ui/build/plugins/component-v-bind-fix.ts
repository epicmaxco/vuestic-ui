import { Plugin } from 'vite'

const parseVBinds = (style: string) => {
  return style
    .match(/v-bind\((.*)\)/g)
    ?.map((line) => line.match(/v-bind\((.*)\)/)![1]) ?? []
}

const getRootNodeCode = (code: string) => {
  const template = code.match(/<template[^>]*>([\s\S]*)<\/template>/)?.[1]
  const rootNode = template?.match(/<[^>]*>/)?.[0]
  return rootNode
}

const renderCssVariablesString = (vBinds: string[]) => {
  return vBinds.map((vBind, index) => {
    return `--va-${index}-${vBind}: ${vBind}`
  }, '').join(';')
}

export const transformVueComponent = (code: string) => {
  const style = code.match(/<style[^>]*>([\s\S]*)<\/style>/)
  if (!style) { return }

  const vBinds = parseVBinds(style[0])
  if (!vBinds.length) { return }

  const rootNode = getRootNodeCode(code)
  if (!rootNode) { throw new Error('vuestic:v-bind-fix-plugin: Root node not found in template') }

  // Replace each v-bind() with var(--va-index-name)
  vBinds.forEach((vBind, index) => {
    code = code.replace(new RegExp(`v-bind\\(${vBind}\\)`, 'gm'), `var(--va-${index}-${vBind})`)
  })

  const existingStyle = rootNode?.match(/[^:]style="([^"]*)"/)?.[1]
  const cssVariablesString = renderCssVariablesString(vBinds)

  // If style attr already exists simply add css variables to it
  if (existingStyle) {
    return code.replace(/style="([^"]*)"/, `style="$1;${cssVariablesString}"`)
  } else {
    const newRootNode = rootNode.replace('>', ` style="${cssVariablesString}">`)
    return code.replace(rootNode, newRootNode)
  }
}

export const componentVBindFix = (): Plugin => {
  return {
    name: 'vuestic:component-v-bind-fix',
    enforce: 'pre',
    transform (code, id) {
      if (/\.vue$/.test(id)) {
        return
      }

      return transformVueComponent(code)
    },
  }
}
