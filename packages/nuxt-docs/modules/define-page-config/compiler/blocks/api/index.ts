import { DefineComponent } from 'vue';
import { defineCompileBlockFn, createImporter } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'
import { type ManualApiOptions } from './types';

export type PageConfig = (componentName: string, manualOptions?: ManualApiOptions) => {
  type: 'api'
  component: DefineComponent,
  manual?: ManualApiOptions,
  componentName: string
}

export const compileApiBlock = defineCompileBlockFn<PageConfig>((code, block, path) => {
  const name = block.args[0].slice(1, -1)

  const importer = createImporter()

  const component = importer.importNamed(name, 'vuestic-ui')

  return {
    code: importer.imports + code.replaceAll(block.code, renderBlock('api', {
      component: `markRaw(${component})`,
      manual: block.args[1],
      componentName: block.args[0],
    })),
  }
})
