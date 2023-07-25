import { DefineComponent } from 'vue';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { VisualOptions, type ManualApiOptions, APIDescriptionOptions } from './types';
import { parseComponent } from './component-parser'

const setup = (
  componentName: string,
  component: DefineComponent,
  cssVariables: string,
  descriptionOptions: APIDescriptionOptions,
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
    descriptionOptions,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (componentName: string, descriptionOptions: APIDescriptionOptions, manual?: ManualApiOptions, visualOptions?: VisualOptions) => ReturnType<typeof setup>,
  component: Component,
})

