import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

export type PageConfigParagraph = (text: string) => {
  type: 'code'
  text: string
}

export const compileParagraphBlock = defineCompileBlockFn<PageConfigParagraph>((code, block, path) => {
  return {
    code: code.replaceAll(block.code, renderBlock('paragraph', {
      text: block.args[0],
    })),
  }
})
