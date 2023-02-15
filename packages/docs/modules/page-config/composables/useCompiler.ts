import { addVitePlugin, extendViteConfig } from '@nuxt/kit';
import { createFilter } from '@rollup/pluginutils'
import { createImporter } from '../compiler/create-importer'
import { resolve } from 'path'
import { transform } from '../compiler/transform'

export const useCompiler = (options: any) => {
  const filter = createFilter(options.include, options.exclude)

  extendViteConfig((config) => {
    // TODO: Find better solution
    // Do not mark code in this modules as asset
    // (?<!modules)\/page-config\/.*\/code\/(?!.*\.(css|scss)).*
    // config.assetsInclude = /(?<!modules)\/page-config\/.*\/code\/.*\.(ts|mjs|js)$/
  })

  addVitePlugin({
    name: 'vuestic:page-config:compiler',

    enforce: 'post',

    async transform(code, id) {
      if (!filter(id)) { return }

      const importer = createImporter(this, id)

      const runtimePath = resolve(__dirname, '../runtime/index.ts')
      importer.importNamed('block', (await this.resolve(runtimePath))!.id)
      importer.importNamed('definePageConfig', (await this.resolve(runtimePath))!.id)
      importer.importNamed('defineManualApi', (await this.resolve(runtimePath))!.id)

      try {
        code = await transform(code, importer)
      } catch (e: any) {
        throw new Error(`Error transforming page-config: ${id}\n${e.message}`)
      }

      try {
        return importer.imports + code
      } catch (e: any) {
        throw new Error(`Error resolving imports in page-config: ${id}\n${e.message}`)
      }
    },
  })
}
