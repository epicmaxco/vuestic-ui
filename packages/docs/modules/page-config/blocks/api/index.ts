import { DefineComponent } from 'vue';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { type ManualApiOptions } from './types';

const setup = (componentName: string, component: DefineComponent, manual?: ManualApiOptions) => {
  return {
    type: 'api' as const,
    componentName,
    component,
    manual,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (componentName: string, manual?: ManualApiOptions) => ReturnType<typeof setup>,
  component: Component,
})

