import { definePageConfigBlock } from '../../types'
import Component from './index.vue'

export type File = { name: string, description?: string, icon?: string, children?: File[] }

export default definePageConfigBlock({
  setup (files: File[]) {
    return {
      type: 'file-structure' as const,
      files,
    }
  },
  component: Component,
})
