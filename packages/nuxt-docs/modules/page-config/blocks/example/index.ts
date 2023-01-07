import { type DefineComponent, markRaw, defineAsyncComponent, ExtractPropTypes } from 'vue'
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

const setup = (component: DefineComponent, source: string) => {
  const asyncComponent = markRaw(component)

  return {
    type: 'example',
    component: asyncComponent,
    source
  }
}

export const example = definePageConfigBlock({
  setup: setup as unknown as (name: string) => ReturnType<typeof setup>,
  component: Component,
})
