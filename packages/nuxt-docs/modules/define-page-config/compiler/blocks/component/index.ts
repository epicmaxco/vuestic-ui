import type { DefineComponent } from "vue"
import { resolve, dirname } from 'path'
import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'


export type PageConfigComponent = (name: string, props?: Record<string, any>) => {
  type: 'component'
  name: string
  component: Promise<DefineComponent>,
  props?: Record<string, any>
}

export const compileComponentBlock = defineCompileBlockFn((code, block, path) => {
  const name = block.args[0].slice(1, -1)

  return {
    code: code.replaceAll(block.code, renderBlock('component', {
      name: block.args[0],
      component: `defineAsyncComponent(() => import('./components/${name}'))`,
      props: block.args[1],
    })),

    files: [resolve(dirname(path), 'components', `${name}.vue`)]
  }
})