import { resolveInRuntime } from './../utils/resolve';
import type { Import } from 'unimport'

import { addImports } from '@nuxt/kit'
import importNames from '../config/composables'

/** Register vuestic composables globally with auto-import */
export const useVuesticComposables = () => {
  const composablesFrom = resolveInRuntime('./runtime/composables.mjs')
  const autoImportsList = importNames
    .map<Import>((item) => ({
      name: item,
      // TODO: We probably need to rename all composables to `useVuesticGlobalConfig`, `useVuesticModal`, etc.
      // Let's have it as an option in the future if there will be any issues. 
      as: item,
      from: composablesFrom,
    }))

    addImports(autoImportsList)
}
