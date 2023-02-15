import { BaseBlock } from './../../runtime/index';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup: (blocks: Promise<BaseBlock[]>) => {
    return {
      type: 'async' as const,
      blocks,
    }
  },
  component: Component,
})

