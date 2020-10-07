import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    // @deprecated, use getColor instead
    $themes: Record<string, string> | undefined;
  }
}

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

// This object is intended to be mutable, so that other services can observe it.
export const themesRef: {value: Record<string, string>} = Vue.observable({
  value: {
    primary: '#23e066',
    secondary: '#002c85',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#e34b4a',
    warning: '#ffc200',
    gray: '#b4b6b9',
    dark: '#34495e',
  },
})

// @deprecated
export const ColorThemePlugin = {
  install (Vue: Vue, options?: { themes?: Record<string, string> }) {
    if (options && options.themes) {
      themesRef.value = { ...themesRef.value, ...options.themes }
    }
  },
}

export const setTheme = (theme: Record<string, string>): void => {
  Object.assign(themesRef.value, theme)
}
