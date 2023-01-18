import { PageConfigOptions, BlockWithCollapse } from './../../runtime/index';
import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export default definePageConfigBlock({
  setup (header: string, blocks: BlockWithCollapse[]) {
    return {
      type: 'collapse',
      header,
      blocks
    }
  },
  component: Component,
})
