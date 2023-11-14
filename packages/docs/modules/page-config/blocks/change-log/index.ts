import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { ChangeLog } from './types'

const setup = (changeLog: ChangeLog) => {
  return {
    type: 'change-log' as const,
    changeLog,
  }
}

export default definePageConfigBlock({
  setup: setup as unknown as () => ReturnType<typeof setup>,
  component: Component,
})

