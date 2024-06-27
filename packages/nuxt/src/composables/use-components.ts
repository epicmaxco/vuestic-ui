import { addComponent } from '@nuxt/kit'
import importNames from '../config/components'

/** Register vuestic composables globally with auto-import */
export const useVuesticComponents = () => {
  importNames.forEach((name) => {
    /**
     * Add component from vuestic-ui package.
     * Nuxt will tree-shake components that not included in options.
     * Nuxt also will add component to auto-import.
     */
    addComponent({
      name,
      export: name,
      filePath: 'vuestic-ui'
    })
  })
}
