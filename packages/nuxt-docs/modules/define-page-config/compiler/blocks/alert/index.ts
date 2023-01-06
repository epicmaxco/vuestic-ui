import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

export type PageConfig = (text: string, color?: string) => {
  type: 'alert'
  text: string
  color: string
}

export const compileAlertBlock = defineCompileBlockFn<PageConfig>((code, block, path) => {
  return {
    code: code.replaceAll(block.code, renderBlock('alert', {
      text: block.args[0],
      color: block.args[1],
    })),
  }
})
