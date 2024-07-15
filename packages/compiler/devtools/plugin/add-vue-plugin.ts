import MagicString from 'magic-string'

const CREATE_APP_TEMPLATE = 'createApp(App)'

/**
 * Add devtools plugin to the Vue app
 */
export const addVuePlugin = (code: string) => {
  const ms = new MagicString(code)

  const createAppIndex = code.indexOf(CREATE_APP_TEMPLATE)

  if (createAppIndex === -1) {
    return null
  }

  ms.appendRight(createAppIndex + CREATE_APP_TEMPLATE.length, '.use(createVuesticDevtools())')
  ms.appendLeft(0, 'import { createVuesticDevtools } from "@vuestic/compiler/devtools";\n')

  return {
    code: ms.toString(),
    map: ms.generateMap({ hires: true }),
  }
}
