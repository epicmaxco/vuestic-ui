import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (name: string, language?: string) {
    return {
      type: 'code',
      content: name,
      language,
    }
  },
  component: Component,
})
