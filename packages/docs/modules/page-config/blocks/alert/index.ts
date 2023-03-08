import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (text: string, color?: string, solid?: boolean) => {
    return {
      type: 'alert' as const,
      text,
      color,
      solid,
    }
  },
  component: Component,
})

