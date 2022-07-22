import type { Import } from 'unimport'

import { addAutoImport } from '@nuxt/kit'
import { resolve } from 'pathe'
import { distDir } from '../dirs'

import * as composables from '../runtime/composables'
// TODO: Not sure if it is okay :D
const composablesNamesList = Object.keys(composables)

/** Register vuestic composables globally with auto-import */
export const useVuesticComposables = () => {
  const composablesFrom = resolve(distDir, './runtime/composables.mjs')
  const autoImportsList = composablesNamesList
    .map<Import>((item) => ({
      name: item, as: item, from: composablesFrom
    }))

  addAutoImport(autoImportsList)
}
