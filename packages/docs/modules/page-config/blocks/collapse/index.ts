import { PageConfigOptions, BaseBlock } from './../../runtime/index';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (header: string, blocks: BaseBlock[]) {
    return {
      type: 'collapse' as const,
      header,
      blocks
    }
  },
  component: Component,
})
