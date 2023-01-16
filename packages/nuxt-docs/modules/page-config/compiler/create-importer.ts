import { resolve, dirname } from 'path'
import { type TransformPluginContext } from 'rollup'
import { resolveAlias } from '@nuxt/kit';

let IMPORT_STATIC_ID = 0
export const createImporter = (ctx: TransformPluginContext, caller: string) => {
  const imports = []

  const resolveWithAlias = (path: string) => {
    return ctx.resolve(resolveAlias(path))
  }

  return {
    importDefault(name: string, path: string) {
      IMPORT_STATIC_ID += 1
      imports.push(`import ${name}_${IMPORT_STATIC_ID} from '${(path)}';\n`)
      return `${name}_${IMPORT_STATIC_ID}`
    },
    importNamed(name: string, path: string) {
      IMPORT_STATIC_ID += 1
      imports.push(`import { ${name} } from '${(path)}';\n`)
      return name
    },

    resolveRelativePath: async (path: string) => {
      return (await resolveWithAlias(resolve(dirname(caller), path))).id
    },

    resolveAbsolutePath: async (path: string) => {
      return (await resolveWithAlias(path)).id
    },

    get imports() {
      return imports.join('\n')
    }
  }
}
