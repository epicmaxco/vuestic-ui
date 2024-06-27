import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (...tags: string[]) => {
    return {
      type: 'tags' as const,
      tags
    }
  },
  component: Component,
})

