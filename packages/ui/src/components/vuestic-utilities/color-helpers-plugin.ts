import Vue from 'vue-class-component'
import { App } from 'vue'
import { getDefaultOptions } from '../../services/ColorThemePlugin'
import { addOrUpdateStyleElement } from '../../services/dom-functions'

// const vmInstance = new Vue()

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

export default ColorHelpersPlugin
