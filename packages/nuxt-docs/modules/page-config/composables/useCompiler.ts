import { addVitePlugin } from '@nuxt/kit';
import { createFilter } from '@rollup/pluginutils'
import { createImporter } from '../compiler/create-importer'
import { parseCode } from '../compiler/parse'

export const useCompiler = (options: any) => {
  const filter = createFilter(options.include, options.exclude)

  addVitePlugin({
    name: 'vuestic:page-config:compiler',

    async transform(code, id) {
      if (!filter(id)) { return }

      const importer = createImporter(this, id)

      importer.importNamed('block', (await this.resolve('@/modules/page-config/runtime')).id)
      importer.importNamed('definePageConfig', (await this.resolve('@/modules/page-config/runtime')).id)

      const blocks = parseCode(code)

      for (const block of blocks) {
        if (block.type === 'example') {
          const importName = block.args[0].slice(1, -1)
          const importPath = await importer.resolvePath(`./examples/${importName}`)
          const importComponent = importer.importDefault(importName, importPath)
          const importSource = importer.importDefault(importName, `${importPath}?raw`)
          code = code.replace(block.code, (b) => {
            return b.replace(block.args[0], `${importComponent}, ${importSource}`)
          })
        }
      }

      /**
       * Add this context to all block call
       *
       * block.example('Button') -> block.example.call({ callerPath: '/..' }, 'Button')
       */
      return importer.imports + code
    },
  })
}
