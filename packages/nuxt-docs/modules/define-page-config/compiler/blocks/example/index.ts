import type { DefineComponent } from "vue"
import { defineCompileBlockFn } from '../defineCompileBlockFn'
import { resolve, dirname } from 'path'

export type PageConfigExample = (name: string) => {
  type: 'example'
  name: string
  component: Promise<DefineComponent>,
  source: Promise<string>
}

export const compileExampleBlock = defineCompileBlockFn<PageConfigExample>(async function (code, block, path) {
  const name = block.args[0].slice(1, -1)

  const componentPath = (await this.resolve(resolve(dirname(path), `./examples/${name}.vue`))).id

  return {
    code: code.replaceAll(block.code, `
    {
      type: 'example',
      name: '${name}',
      component: markRaw(defineAsyncComponent(() => import('${componentPath}'))),
      source: import('./examples/${name}.vue?raw').then(m => m.default),
    }
    `.trim()),
    files: [resolve(dirname(path), 'examples', `${name}.vue`)]
  }
})
