import { type DefineComponent, markRaw } from 'vue'
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

const setup = (component: DefineComponent, source: string, path: string) => {
  const asyncComponent = markRaw(component)

  return {
    type: 'example',
    component: asyncComponent,
    source,
    path
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as (name: string) => ReturnType<typeof setup>,
  component: Component,
})
