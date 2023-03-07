import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (text: string, color?: string, outline?: boolean) => {
    return {
      type: 'alert' as const,
      text,
      color,
      outline,
    }
  },
  component: Component,
})

