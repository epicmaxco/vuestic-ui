import Vue from 'vue'
import { themesRef } from '../../services/ColorThemePlugin'
import { addOrUpdateStyleElement } from '../../services/dom-functions'

const vmInstance = new Vue()

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
    // @ts-ignore
    vmInstance.$watch(() => themesRef.value, {
      deep: true,
      immediate: true,
      handler: () => {
        addOrUpdateStyleElement('va-theme-styles', () => createThemeColorStyles(themesRef.value))
      },
    })
  },
}

export default ColorHelpersPlugin
