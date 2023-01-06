import { defineCompileBlockFn, createImporter } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'
import { resolve, extname } from 'path'

export type PageConfig = (path: string, language?: string) => {
  type: 'file'
  code: string
  language: string
}

export const compileFileBlock = defineCompileBlockFn<PageConfig>((code, block) => {
  const path = block.args[0].slice(1, -1)

  const importer = createImporter()

  const codeImport = importer.importDefault(`code`, `${path}?raw`)

  return {
    code: importer.imports + code.replaceAll(block.code, renderBlock('file', {
      code: codeImport,
      language: block.args[1] || `'${extname(resolve(path)).slice(1)}'`,
    })),
  }
})
