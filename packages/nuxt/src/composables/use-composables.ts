import type { Import } from 'unimport'

import { addAutoImport } from '@nuxt/kit'
import { resolve } from 'pathe'
import { distDir } from '../dirs'
import importNames from '../config/composables'

/** Register vuestic composables globally with auto-import */
export const useVuesticComposables = () => {
  const composablesFrom = resolve(distDir, './runtime/composables.mjs')
  const autoImportsList = importNames
    .map<Import>((item) => ({
      name: item,
      // TODO: We probably need to rename all composables to `useVuesticGlobalConfig`, `useVuesticModal`, etc.
      // Let's have it as an option in the future if there will be any issues. 
      as: item,
      from: composablesFrom,
    }))

  addAutoImport(autoImportsList)
}
