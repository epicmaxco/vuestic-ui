import Vue from 'vue'
import { themesRef } from '../../services/ColorThemePlugin'
import { addOrUpdateStyleElement } from '../../services/dom-functions'

declare module 'vue/types/vue' {
  interface Vue {
    $themes: Record<string, string> | undefined;
  }
}

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

// This plugin is considered a separate entity from components.
// Components should not be aware it exists at all. Neither it should be used in vue-book.
// Appropriate use cases are user app and documentation.
const ColorHelpersPlugin = {
  install () {
    // NOTE Nuxt went broken without this check. Seemingly loaded plugin twice.
    if (!Vue.prototype.$themes) {
      // @ts-ignore
      Object.defineProperty(Vue.prototype, '$themes', {
        get: () => themesRef.value,
      })
    }

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
