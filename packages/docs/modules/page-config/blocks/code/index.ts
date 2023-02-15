import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (name: string | Record<string, string>, language?: string) {
    return {
      type: 'code' as const,
      content: name,
      language,
    }
  },
  component: Component,
})
