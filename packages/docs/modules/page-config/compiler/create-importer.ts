import { resolve, dirname, parse } from 'path'
import { type TransformPluginContext } from 'rollup'
import { resolveAlias } from '@nuxt/kit';
import { readdirSync, existsSync } from 'fs'
import javascriptKeywords from './javascript-keywords';
import kebabCase from 'lodash/kebabCase'
import camelCase from 'lodash/camelCase'

const resolveFromFolder = (dir: string, file: string) => {
  if (!existsSync(dir)) { return null }

  const dirFiles = readdirSync(dir)

  for (const dirFile of dirFiles) {
    const name = parse(dirFile).name
    if (name === file) {
      return resolve(dir, dirFile)
    }
  }

  return null
}

type Imports = {
  name: string,
  alias: string,
  type: 'default' | 'named'
}

export const createImporter = (ctx: TransformPluginContext, caller: string) => {
  const pathImports: Record<string, Imports[]> = {}

  const resolveWithAlias = async (path: string) => {
    let foundPath = await ctx.resolve(resolveWithoutExtension(resolveAlias(path)))
    if (foundPath) {
      return foundPath
    }

    foundPath = await ctx.resolve(resolveWithoutExtension(resolveAlias(path)).toLowerCase())

    if (foundPath) {
      return foundPath
    }

    foundPath = await ctx.resolve(kebabCase(resolveWithoutExtension(resolveAlias(path))))

    if (foundPath) {
      return foundPath
    }

    foundPath = await ctx.resolve(camelCase(resolveWithoutExtension(resolveAlias(path))))

    if (foundPath) {
      return foundPath
    }

    return null
  }

  const fixFileNameImport = (path: string) => {
    return path.replace(/-|\.|\//g, '_')
  }

  const fixFilePath = (path: string) => {
    if (/(css|scss)\?raw$/.test(path)) {
      return path.replace(/\?raw$/, '?inline')
    }

    return path
  }

  const resolveWithoutExtension = (path: string) => {
    if (/\w*\.\w*/.test(path)) { return path }

    const p = parse(path)

    return resolveFromFolder(p.dir, p.name) || path
  }

  const findImportAlias = (path: string, name: string) => {
    const index = Object.keys(pathImports).reduce((acc, key) => {
      if (key === path) { return acc }

      return acc + pathImports[key].reduce((acc, i) => {
        return acc + (i.name === name ? 1 : 0)
      }, 0)
    }, 0)

    if (index > 0 || javascriptKeywords.includes(name)) {
      return `${name}_${index}`
    }

    return name
  }

  return {
    importDefault(name: string, path: string) {
      name = fixFileNameImport(name)
      path = fixFilePath(path)

      if (!pathImports[path]) {
        pathImports[path] = []
      }

      const existingImport = pathImports[path].find((i) => i.type === 'default')

      if (existingImport) {
        return existingImport.alias
      }

      const alias = findImportAlias(path, name)

      pathImports[path].push({ name, alias, type: 'default' })

      return alias
    },
    importNamed(name: string, path: string) {
      name = fixFileNameImport(name)
      path = fixFilePath(path)

      if (!pathImports[path]) {
        pathImports[path] = []
      }

      const existingImport = pathImports[path].find((i) => i.type === 'named' && i.name === name)

      if (existingImport) {
        return existingImport.alias
      }

      const alias = findImportAlias(path, name)

      pathImports[path].push({ name, alias, type: 'named' })

      return alias
    },

    resolveRelativePath: async (path: string) => {
      return (await resolveWithAlias(resolve(dirname(caller), path)))?.id
    },

    resolveAbsolutePath: async (path: string) => {
      return (await resolveWithAlias(path))?.id
    },

    get imports() {
      return Object.entries(pathImports).map(([path, imports]) => {
        if (path === undefined) {
          throw new Error(`Unable to resolve imports "${imports.map((i) => i.name).join(', ')}}`)
        }

        const defaultImport = imports.find((i) => i.type === 'default')?.alias
        const namedImports = imports
          .filter((i) => i.type === 'named')
          .map((i) => {
            if (i.alias) {
              return `${i.name} as ${i.alias}`
            }

            return i.name
          }).join(', ')

        const allImports = [defaultImport, namedImports ? `{ ${namedImports} }` : null].filter(Boolean).join(', ')

        if (allImports === "undefined") {
          throw new Error(`Unable to resolve import from ${path}`)
        }

        return `import ${allImports} from '${path}';`
      }).join('\n')
    }
  }
}

export type Importer = ReturnType<typeof createImporter>
