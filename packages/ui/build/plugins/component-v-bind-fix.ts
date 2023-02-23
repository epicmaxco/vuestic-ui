import { Plugin } from 'vite'

export const transformVueComponent = (code: string) => {
  const style = code.match(/<style[^>]*>([\s\S]*)<\/style>/)

  const vBinds = style?.[1].match(/v-bind\((.*)\)/g)?.map((line) => line.match(/v-bind\((.*)\)/)?.[1]) ?? []

  vBinds.forEach((vBind, index) => {
    code = code.replace(new RegExp(`v-bind\\(${vBind}\\)`, 'gm'), `var(--va-${index}-${vBind})`)
  })

  const varsObject = `{ ${vBinds.map((vBind, index) => {
    return `'--va-${index}-${vBind}': ${vBind}`
  }, '').join(',')} }`

  const varsString = vBinds.map((vBind, index) => {
    return `--va-${index}-${vBind}: ${vBind}`
  }, '').join(';')

  const template = code.match(/<template[^>]*>([\s\S]*)<\/template>/)?.[1]

  const rootNode = template?.match(/<[^>]*>/)?.[0]

  if (!rootNode) { throw new Error('vuestic:v-bind-fix-plugin: Root node not found in template') }

  const existingStyleVBind = rootNode?.match(/:style="([^"]*)"/)?.[1]
  const existingStyle = rootNode?.match(/style="([^"]*)"/)?.[1]

  if (existingStyleVBind) {
    code = code.replace(/:style="([^"]*)"/, `:style="typeof $1 === 'object' ? { ...$1, ...${varsObject} } : $1 + ';${varsString}'"`)
  } else if (existingStyle) {
    code = code.replace(/style="([^"]*)"/, `style="$1;${varsString}"`)
  } else {
    const newRootNode = rootNode.replace('>', ` style="${varsString}">`)
    code = code.replace(rootNode, newRootNode)
  }

  return code
}

export const componentVBindFix = (): Plugin => {
  return {
    name: 'vuestic:component-v-bind-fix',
    enforce: 'pre',
    transform (code, id) {
      // console.log(id)
      if (!id.includes('VaButton')) {
        return
      }

      return transformVueComponent(code)
    },
  }
}
