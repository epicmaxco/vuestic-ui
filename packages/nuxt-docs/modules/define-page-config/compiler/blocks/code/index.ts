import type { DefineComponent } from "vue"
import { resolve, dirname } from 'path'
import { defineCompileBlockFn, createImporter } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

export type PageConfigCode = (code: string, language?: string) => {
  type: 'code'
  code: string
  language: string
}

export const compileCodeBlock = defineCompileBlockFn<PageConfigCode>((code, block, path) => {
  const name = block.args[0].slice(1, -1)

  const importer = createImporter()

  const codeImport = importer.importDefault(`code`, `./code/${name}?raw`)

  return {
    code: importer.imports + code.replaceAll(block.code, renderBlock('code', {
      code: codeImport,
      language: block.args[1],
    })),
  }
})
