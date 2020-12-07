import Vue from 'vue'
import { getDefaultOptions } from '../../../../ui/src/services/ColorThemePlugin'
import { addOrUpdateStyleElement } from '../../../../ui/src/services/dom-functions'
import { getHoverColor } from '../../../../ui/src/services/color-functions'
const vmInstance = new Vue()

const createThemeColorStyles = (themes: Record<string, string>): string => {
  let result = ''

  result += `.algolia-docsearch-suggestion--highlight { background-color: ${getHoverColor(themes.primary)} !important; }`
  result += `.algolia-docsearch-suggestion--highlight { color: ${themes.primary} !important; }`

  return result
}

const AlgoliaColorPlugin = {
  install () {
    const defaultOptions = getDefaultOptions()
    // @ts-ignore
    vmInstance.$watch(() => defaultOptions.themes, {
      deep: true,
      immediate: true,
      handler: () => {
        addOrUpdateStyleElement('va-theme-styles', () => createThemeColorStyles(defaultOptions.themes))
      },
    })
  },
}

export default AlgoliaColorPlugin
