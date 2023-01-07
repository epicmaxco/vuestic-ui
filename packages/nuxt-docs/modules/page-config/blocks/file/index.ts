import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (file: string, language?: string) {
    return {
      type: 'file',
      content: file,
      language,
    }
  },
  component: Component,
})
