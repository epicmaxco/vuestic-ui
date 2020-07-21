import Vue from 'vue'
import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'
import { Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    // @deprecated, use getColor instead
    $themes: Record<string, string> | undefined;
  }
}

// Most default color - fallback when nothing else is found.
const DEFAULT_COLOR = '#000000'

const defaultOptions = Vue.observable({
  themes: {
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

export const THEME_NAMES = {
  DEFAULT: 'DEFAULT',
  CORPORATE: 'CORPORATE',
}

export const COLOR_THEMES = [
  {
    name: THEME_NAMES.DEFAULT,
    themes: {
      primary: '#40e583',
      secondary: '#002c85',
      success: '#40e583',
      info: '#2c82e0',
      danger: '#e34b4a',
      warning: '#ffc200',
      gray: '#babfc2',
      dark: '#34495e',
    },
  },
  {
    name: THEME_NAMES.CORPORATE,
    themes: {
      primary: '#6c7fee',
      secondary: '#6e7ff1',
      success: '#8ddc88',
      info: '#71baff',
      danger: '#f8706d',
      warning: '#ffd652',
      gray: '#8396a5',
      dark: '#34495e',
    },
  },
]

export const getDefaultOptions = () => defaultOptions

export const ColorThemePlugin = {
  install (Vue: Vue, options?: { themes?: Record<string, string> }) {
    if (options && options.themes) {
      defaultOptions.themes = { ...defaultOptions.themes, ...options.themes }
    }

    // @ts-ignore
    Vue.prototype.$themes = defaultOptions.themes
  },
}

/**
 * Check if color is valid css color
 * Taken from https://stackoverflow.com/a/56266358/5783475
 * @param strColor
 */
export const isCssColor = (strColor: string): boolean => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}

export const getColor = ($vm: Vue, prop: string, defaultColor: string = DEFAULT_COLOR): string => {
  if ($vm.$themes && $vm.$themes[prop]) {
    return $vm.$themes[prop]
  }

  if (isCssColor(prop)) {
    return prop
  }

  return defaultColor
}

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

  setTheme (theme: Record<string, string>) {
    Object.assign(this.$themes, theme)
  }
}
