import { resolve, dirname } from 'path'
import { type TransformPluginContext } from 'rollup'

let IMPORT_STATIC_ID = 0
export const createImporter = (ctx: TransformPluginContext, caller: string) => {
  const imports = []

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
      return (await ctx.resolve(resolve(dirname(caller), path))).id
    },

    resolveAbsolutePath: async (path: string) => {
      return (await ctx.resolve(path)).id
    },

    get imports() {
      return imports.join('\n')
    }
  }
}
