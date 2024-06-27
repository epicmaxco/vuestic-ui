import { BaseBlock } from './../../types';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (tabs: Record<string, BaseBlock[]>) {
    return {
      type: 'tabs' as const,
      tabs
    }
  },
  component: Component,
})
