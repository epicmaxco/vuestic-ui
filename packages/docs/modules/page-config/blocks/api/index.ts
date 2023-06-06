import { DefineComponent } from 'vue';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { VisualOptions, type ManualApiOptions } from './types';
import type { ComponentMeta } from 'vue-component-meta'
import { parseComponent } from './component-parser'

const setup = (
  componentName: string, 
  component: DefineComponent,
  cssVariables: string,
  manual?: ManualApiOptions,
  visualOptions?: VisualOptions,
) => {
  return {
    type: 'api' as const,
    componentName,
    component,
    cssVariables,
    meta: parseComponent(componentName),
    manual,
    visualOptions,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (componentName: string, manual?: ManualApiOptions, visualOptions?: VisualOptions) => ReturnType<typeof setup>,
  component: Component,
})

