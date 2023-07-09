import MagicString from 'magic-string';
import { addVitePlugin } from '@nuxt/kit';
import { createFilter } from '@rollup/pluginutils'
import { createImporter } from '../compiler/create-importer'
import { resolve } from 'pathe'
import { transform } from '../compiler/transform'

export const useCompiler = (options: any) => {
  const filter = createFilter(options.include, options.exclude)

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

      const newCode = new MagicString(code)

      try {
        newCode.overwrite(0, code.length, await transform(code, importer))
      } catch (e: any) {
        throw new Error(`Error transforming page-config: ${id}\n${e.message}`)
      }

      newCode.prepend(importer.imports)

      try {
        return {
          code: newCode.toString(),
          map: newCode.generateMap({ hires: true }),
        }
      } catch (e: any) {
        throw new Error(`Error resolving imports in page-config: ${id}\n${e.message}`)
      }
    },
  })
}
