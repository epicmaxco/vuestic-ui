import { BaseBlock } from './../../runtime';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (tabs: Record<string, BaseBlock[]>) {
    return {
      type: 'collapse' as const,
      tabs
    }
  },
  component: Component,
})
