import { type DefineComponent, markRaw } from 'vue'
import { CodeSandboxConfig } from '../../../../composables/code-sandbox'
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

type Options = Partial<{
  hideCode: boolean,
  hideTitle: boolean,
  hideTemplate: boolean,
  forceShowCode: boolean,
  description: string,
  title: string;
  codesandboxConfig: CodeSandboxConfig
}>

const setup = (component: DefineComponent, source: string, path: string, options: Options) => {
  return {
    type: 'example' as const,
    component: markRaw(component),
    source,
    path,
    ...options,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (name: string, options?: Options) => ReturnType<typeof setup>,
  component: Component,
})
