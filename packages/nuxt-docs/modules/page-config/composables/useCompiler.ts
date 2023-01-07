import { addVitePlugin } from '@nuxt/kit';
import { createFilter } from '@rollup/pluginutils'
import { createImporter } from '../compiler/create-importer'
import { parseCode } from '../compiler/parse'
import { extname } from 'path'

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

        if (block.type === 'component') {
          const importName = block.args[0].slice(1, -1)
          const importPath = await importer.resolvePath(`./components/${importName}`)
          const importComponent = importer.importDefault(importName, importPath)
          code = code.replace(block.code, (b) => {
            return b.replace(block.args[0], `${importComponent}`)
          })
        }

        if (block.type === 'code') {
          const importName = block.args[0].slice(1, -1)
          const importPath = await importer.resolvePath(`./code/${importName}`)
          const importComponent = importer.importDefault(importName, importPath)
          code = code.replace(block.code, (b) => {
            return b.replace(block.args[0], `${importComponent}`)
          })
        }

        if (block.type === 'file') {
          const importName = block.args[0].slice(1, -1)
          const importPath = (await this.resolve(`${importName}`)).id
          const importComponent = importer.importDefault('file', importPath)
          const importExt = block.args[1] || `'${extname(importPath).slice(1)}'`
          code = code.replace(block.code, (b) => {
            return b.replace(block.args[0], `${importComponent}, ${importExt}`)
          })
        }

        if (block.type === 'api') {
          const importName = block.args[0].slice(1, -1)
          const importPath = (await this.resolve('vuestic-ui')).id
          const importComponent = importer.importNamed(importName, importPath)
          code = code.replace(block.code, (b) => {
            return b.replace(block.args[0], `'${importName}', ${importComponent}`)
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
