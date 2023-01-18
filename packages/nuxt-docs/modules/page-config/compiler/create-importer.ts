import { resolve, dirname, parse } from 'path'
import { type TransformPluginContext } from 'rollup'
import { resolveAlias } from '@nuxt/kit';
import { readdirSync } from 'fs'

const resolveFromFolder = (dir: string, file: string) => {
  const dirFiles = readdirSync(dir)

  for (const dirFile of dirFiles) {
    const name = parse(dirFile).name
    if (name === file) {
      return resolve(dir, dirFile)
    }
  }

  return null
}

let IMPORT_STATIC_ID = 0
export const createImporter = (ctx: TransformPluginContext, caller: string) => {
  const imports: string[] = []

  const resolveWithAlias = (path: string) => {
    return ctx.resolve(resolveWithoutExtension(resolveAlias(path)))
  }

  const fixFileNameImport = (path: string) => {
    return path.replace(/-|\./g, '_')
  }

  const resolveWithoutExtension = (path: string) => {
    if (/\w*\.\w*/.test(path)) { return path }

    const p = parse(path)

    return resolveFromFolder(p.dir, p.name) || path
  }

  return {
    importDefault(name: string, path: string) {
      IMPORT_STATIC_ID += 1
      name = fixFileNameImport(name)
      imports.push(`import ${name}_${IMPORT_STATIC_ID} from '${(path)}';\n`)
      return `${name}_${IMPORT_STATIC_ID}`
    },
    importNamed(name: string, path: string) {
      IMPORT_STATIC_ID += 1
      name = fixFileNameImport(name)
      imports.push(`import { ${name} } from '${(path)}';\n`)
      return name
    },

    resolveRelativePath: async (path: string) => {
      return (await resolveWithAlias(resolve(dirname(caller), path)))?.id
    },

    resolveAbsolutePath: async (path: string) => {
      return (await resolveWithAlias(path))?.id
    },

    get imports() {
      return imports.join('\n')
    }
  }
}

export type Importer = ReturnType<typeof createImporter>
