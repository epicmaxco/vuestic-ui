// @ts-nocheck
import { App, watch } from 'vue'
import { getDefaultOptions } from '../../services/color-config/ColorMixin'
import { addOrUpdateStyleElement } from '../../services/dom-functions'

const createThemeColorStyles = (themes: Record<string, string>): string => {
  let result = ''

  Object.keys(themes).map((name) => {
    result += `.background--${name.toLowerCase()} { background-color: ${themes[name]} !important; }`
  })
  Object.keys(themes).map((name) => {
    result += `.text--${name.toLowerCase()} { color: ${themes[name]} !important; }`
  })

  return result
}

const ColorHelpersPlugin = {
  install () {
    const defaultOptions = getDefaultOptions()

    watch(
      () => defaultOptions.themes,
      () => {
        addOrUpdateStyleElement('va-theme-styles', () => createThemeColorStyles(defaultOptions.themes))
      },
      {
        deep: true,
        immediate: true,
      },
    )
  },
}

export default ColorHelpersPlugin
