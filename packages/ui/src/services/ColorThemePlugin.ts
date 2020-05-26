import Vue from 'vue'
import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'
import { Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    $themes: Record<string, string> | undefined;
  }
}

// Most default color - fallback when nothing else is found.
const DEFAULT_COLOR = '#000000'

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

export const ColorThemePlugin = {
  install (Vue: Vue, options?: { themes?: Record<string, string> }) {
    if (options && options.themes) {
      themesRef.value = { ...themesRef.value, ...options.themes }
    }
    // @ts-ignore
    // This plugin is not intended.
    Object.defineProperty(Vue.prototype, '$themes', {
      get: () => themesRef.value,
    })
  },
}

/**
 * Check if color is valid css color
 * Taken from https://stackoverflow.com/a/56266358/5783475
 * Please note that it requires either jsdom or browser environment to function properly. That's intended.
 * @param strColor
 */
export const isCssColor = (strColor: string): boolean => {
  const style = new Option().style
  style.color = strColor
  return style.color !== ''
}

export const getColor = ($vm: Vue, prop: string, defaultColor: string = DEFAULT_COLOR): string => {
  // We do not really want to absolutely keep this ref global, but it probably will do for 1.0.
  if (themesRef.value[prop]) {
    return themesRef.value[prop]
  }

  if (isCssColor(prop)) {
    return prop
  }

  return defaultColor
}

export const setTheme = (theme: Record<string, string>): void => {
  Object.assign(themesRef.value, theme)
}

/**
 * This mixin does not cover all needed color functionality for majority of components.
 * Its main purpose is raw code reuse.
 */
@Component({
  mixins: [
    makeContextablePropsMixin({
      color: {
        type: String,
      },
    }),
  ] as any,
})
export class ColorThemeMixin extends Vue {
  get colorComputed () {
    return getColor(this, (this as any).c_color)
  }

  computeColor (prop: string, defaultColor?: string) {
    return getColor(this, prop, defaultColor)
  }
}
