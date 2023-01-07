import { type DefineComponent, markRaw, defineAsyncComponent, ExtractPropTypes } from 'vue'
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

const setup = (component: DefineComponent) => {
  const asyncComponent = markRaw(component)

  return {
    type: 'component',
    component: asyncComponent
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (name: string) => ReturnType<typeof setup>,
  component: Component,
})
