import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (text: string) => {
    return {
      type: 'title' as const,
      text
    }
  },
  component: Component,
})

