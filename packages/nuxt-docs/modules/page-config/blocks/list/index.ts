import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (text: string[]) => {
    return {
      type: 'list',
      text
    }
  },
  component: Component,
})

