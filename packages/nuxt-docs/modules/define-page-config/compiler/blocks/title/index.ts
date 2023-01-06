import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

export type PageConfigTitle = (text: string) => {
  type: 'title'
  text: string
}

export const compileTitleBlock = defineCompileBlockFn<PageConfigTitle>((code, block, path) => {
  return {
    code: code.replaceAll(block.code, renderBlock('title', {
      text: block.args[0],
    })),
  }
})
