import { DefineComponent } from 'vue';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { VisualOptions, type ManualApiOptions, APIDescriptionOptions } from './types';
import { parseComponent } from './component-parser'
import type * as components from 'vuestic-ui/src/services/vue-plugin/components'
import { ExtractComponentProps } from 'vuestic-ui/src/utils/component-options';
import { VuesticComponent } from 'vuestic-ui/src/services/component-config';

const setup = (
  componentName: string,
  component: DefineComponent,
  cssVariables: string,
  changeLog: string,
  descriptionOptions: APIDescriptionOptions,
  manual?: ManualApiOptions,
  visualOptions?: VisualOptions,
) => {
  return {
    type: 'api' as const,
    componentName,
    component,
    cssVariables,
    changeLog,
    meta: parseComponent(componentName),
    manual,
    visualOptions,
    descriptionOptions,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as <
    ComponentName extends keyof typeof components,
    Component extends typeof components[ComponentName] = typeof components[ComponentName]
  >(
    componentName: ComponentName,
    descriptionOptions: {
      props?: Partial<Record<keyof ExtractComponentProps<Component>, string>>,
      events?: Partial<Record<keyof Component['emits'], string>>,
      slots?: Record<string, string>,
      methods?: Partial<Record<keyof Component['methods'], string>>,
    },
     manual?: ManualApiOptions,
     visualOptions?: VisualOptions
  ) => ReturnType<typeof setup>,
  component: Component,
})

