import { DefineComponent } from 'vue';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { VisualOptions, type ManualApiOptions, APIDescriptionOptions } from './types';
import type { ComponentMeta } from 'vue-component-meta'
import { parseComponent } from './component-parser'

const setup = (
  componentName: string,
  component: DefineComponent,
  cssVariables: string,
  translations: APIDescriptionOptions,
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
    translations,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (componentName: string, description: APIDescriptionOptions, manual?: ManualApiOptions, visualOptions?: VisualOptions) => ReturnType<typeof setup>,
  component: Component,
})

