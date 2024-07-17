import { Plugin } from 'vite'
import { isEntryFile } from '../../shared/plugin/is-entry-file'
import { addImport, compileCode, mergeVuesticPluginConfigOption } from '../../shared/plugin/js'
import { isConfigExists } from './config-resolver'

const CONFIG_IMPORT_NAME = 'vuesticConfig$va1'

/** Tries to import `#vuestic-config` into main.ts file, adds it to createVuestic() */
export const useConfig =  (options: {
  configPath?: string
} = {}): Plugin => {
  return {
    name: 'vuestic:use-config',

    transform(code, id) {
      if (!isEntryFile(id)) {
        return
      }

      if (!isConfigExists(options.configPath)) {
        return
      }

      let newCode = addImport(code, `import ${CONFIG_IMPORT_NAME} from '#vuestic-config'`)

      const createVuestic = mergeVuesticPluginConfigOption(newCode, 'createVuestic', CONFIG_IMPORT_NAME)
      const createVuesticEssential = mergeVuesticPluginConfigOption(newCode, 'createVuesticEssential', CONFIG_IMPORT_NAME)

      if (createVuestic) {
        return compileCode(createVuestic)
      }

      if (createVuesticEssential) {
        return compileCode(createVuesticEssential)
      }

      throw new Error('createVuestic or createVuesticEssential not found')
    },
  }
}
