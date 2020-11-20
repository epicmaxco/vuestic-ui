import Vue from 'vue'
import { useTheme } from '../../services/Theme'
import { addOrUpdateStyleElement } from '../../services/dom-functions'

const vmInstance = new Vue()

const createThemeColorStyles = (themes: Record<string, string> | null | undefined): string => {
  let result = ''

  if (!themes) {
    return result
  }

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
    Vue.mixin({
      setup () {
        const { getTheme } = useTheme() || {}

        // @ts-ignore
        vmInstance.$watch(() => getTheme(), {
          deep: true,
          immediate: true,
          handler: () => {
            addOrUpdateStyleElement('va-theme-styles', () => createThemeColorStyles(getTheme ? getTheme() : null))
          },
        })
      },
    })
  },
}

export default ColorHelpersPlugin
