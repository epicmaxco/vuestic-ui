import { VuesticOptions } from './../types';
import { addComponent } from '@nuxt/kit'
import componentNames from '../config/components'

/** Register vuestic composables globally with auto-import */
export const useVuesticComponents = (options: VuesticOptions) => {
  const importNames = componentNames

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
