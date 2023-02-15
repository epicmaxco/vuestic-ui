import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (text: string, color?: string) => {
    return {
      type: 'alert' as const,
      text,
      color
    }
  },
  component: Component,
})

