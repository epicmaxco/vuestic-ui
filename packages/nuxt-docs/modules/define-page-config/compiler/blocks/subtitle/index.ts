import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

export type PageConfigSubtitle = (text: string) => {
  type: 'code'
  text: string
}

export const compileSubtitleBlock = defineCompileBlockFn<PageConfigSubtitle>((code, block, path) => {
  return {
    code: code.replaceAll(block.code, renderBlock('subtitle', {
      text: block.args[0],
    })),
  }
})
