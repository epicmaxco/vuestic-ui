import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { ChangeLog } from './types'

export default definePageConfigBlock({
  setup: (log: ChangeLog) => {
    return {
      type: 'change-log' as const,
      log
    }
  },
  component: Component,
})

