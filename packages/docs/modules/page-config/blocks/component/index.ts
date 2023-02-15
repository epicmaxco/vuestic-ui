import { type DefineComponent, markRaw, defineAsyncComponent, ExtractPropTypes } from 'vue'
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

const setup = (component: DefineComponent, bind: Record<string, any> = {}) => {
  const asyncComponent = markRaw(component)

  return {
    type: 'component' as const,
    component: asyncComponent,
    bind
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (name: string, bind?: Record<string, any>) => ReturnType<typeof setup>,
  component: Component,
})
