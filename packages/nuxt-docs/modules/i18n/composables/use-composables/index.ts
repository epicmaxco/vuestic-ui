import type { Import } from 'unimport'
import { addAutoImport } from "@nuxt/kit"
import { resolve } from 'pathe'

export const useComposables = () => {
  const composablesFrom = resolve(__dirname, './composables/index.ts')
  const autoImportsList = ['useI18n']
    .map<Import>(item => ({
      name: item,
      as: item,
      from: composablesFrom
    }))

  addAutoImport(autoImportsList)
}