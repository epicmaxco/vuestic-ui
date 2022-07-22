import { VuesticOptions } from './../types';
import { addComponent } from '@nuxt/kit'

/** Register vuestic composables globally with auto-import */
export const useVuesticComponents = (options: VuesticOptions) => {
  const importNames = options.components

  importNames.forEach((name) => {
    /** 
     * Add component from vuestic-ui package. 
     * Nuxt will tree-shake components that not included in options.
     * Nuxt also will add component to auto-import.
     */
    addComponent({
      name,
      export: name,
      filePath: `vuestic-ui`,
    })
  })
}
