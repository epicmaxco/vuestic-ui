import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

type File = { name: string, description?: string, icon?: string, children?: File[] }

export type PageConfig = (files: File[]) => {
  type: 'file-structure'
  files: File[]
}

export const compileFileStructureBlock = defineCompileBlockFn<PageConfig>((code, block, path) => {
  return {
    code: code.replaceAll(block.code, renderBlock('file-structure', {
      text: block.args[0],
    })),
  }
})
