import MagicString from 'magic-string'
import { addImport, addVuePlugin } from '../../shared/plugin/js'

/**
 * Add devtools plugin to the Vue app
 */
export const setupDevtoolsVuePlugin = (code: string) => {
  let newCode = addVuePlugin(code, 'createVuesticDevtools()')

  if (!newCode) {
    return null
  }

  newCode = addImport(newCode, 'import { createVuesticDevtools } from "@vuestic/compiler/devtools";')

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  }
}
