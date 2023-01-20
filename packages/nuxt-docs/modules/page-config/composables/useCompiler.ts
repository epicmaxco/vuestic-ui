import { addVitePlugin, extendViteConfig } from '@nuxt/kit';
import { createFilter } from '@rollup/pluginutils'
import { createImporter } from '../compiler/create-importer'
import { parseCode } from '../compiler/parse'
import { extname, resolve } from 'path'
import { transform } from '../compiler/transform'

export const useCompiler = (options: any) => {
  const filter = createFilter(options.include, options.exclude)

  extendViteConfig((config) => {
    config.optimizeDeps?.exclude?.push('@/page-config/*/code/')
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

      code = await transform(code, importer)

      // OLD

      const blocks = parseCode(code)
      // TODO: Handle unresolved imports

      for (const block of blocks) {
        if (block.type === 'example') {
          const importName = block.args[0].slice(1, -1)
          const importPath = (await importer.resolveRelativePath(`./examples/${importName}`))!
          const importComponent = importer.importDefault(importName, importPath)
          const importSource = importer.importDefault(importName, `${importPath}?raw`)
          const path = /page-config\/.*$/.exec(importPath)?.[0]

          code = block.replaceArgCode(0, `${importComponent}, ${importSource}, "${path}"`)
        }

        if (block.type === 'component') {
          const importName = block.args[0].slice(1, -1)
          const importPath = (await importer.resolveRelativePath(`./components/${importName}`))!
          const importComponent = importer.importDefault(importName, importPath)

          code = block.replaceArgCode(0, importComponent)
        }

        // if (block.type === 'code') {
        //   const importName = block.args[0].slice(1, -1)
        //   const importPath = (await importer.resolveRelativePath(`./code/${importName}`))

        //   if (importPath) {
        //     const importedVariable = importer.importDefault(importName, `${importPath}?raw`)

        //     code = block.replaceArgCode(0, `${importedVariable}`)
        //   }
        // }

        if (block.type === 'file') {
          const importName = block.args[0].slice(1, -1)
          const importPath = (await importer.resolveAbsolutePath(`${importName}`))!
          const importComponent = importer.importDefault('file', importPath)
          const importExt = block.args[1] || `'${extname(importPath).slice(1)}'`

          code = block.replaceArgCode(0, `${importComponent}, ${importExt}`)
        }

        if (block.type === 'api') {
          const importName = block.args[0].slice(1, -1)
          const importPath = (await importer.resolveAbsolutePath('vuestic-ui'))!
          const importComponent = importer.importNamed(importName, importPath)

          code = block.replaceArgCode(0, `'${importName}', ${importComponent}`)
        }
      }

      // console.log(importer.imports + code)

      return importer.imports + code
    },
  })
}
