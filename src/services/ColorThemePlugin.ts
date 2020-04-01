import Vue from 'vue'
import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'
import { Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    $themes: Record<string, string> | undefined;
  }
}

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

export const getDefaultOptions = () => defaultOptions

export const ColorThemePlugin = {
  install (Vue: Vue, options?: {themes?: Record<string, string>}) {
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
const isCssColor = (strColor: string): boolean => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}

export const getColor = ($vm: any, prop: string, defaultColor?: string): string | undefined => {
  if ($vm.$themes && $vm.$themes[prop]) {
    return $vm.$themes[prop]
  }

  if (isCssColor(prop)) {
    return prop
  }

  return defaultColor
}

@Component({
  mixins: [makeContextablePropsMixin({
    color: {
      type: String,
    },
    dark: {
      type: Boolean,
    },
  })] as any,
})
export class ColorThemeMixin extends Vue {
  defaultColor = '#000'
  defaultInvertedColor = '#fff'

  get colorComputed () {
    return this.computeColor((this as any).c_color)
  }

  computeColor (prop: string) {
    return getColor(this, prop)
  }

  computeInvertedColor (prop: string) {
    return getColor(this, prop, this.defaultInvertedColor)
  }
}

@Component({
  mixins: [makeContextablePropsMixin({
    textColor: {
      type: String,
    },
  })] as any,
})
export class TextColorThemeMixin extends Vue {
  get textColorComputed () {
    return getColor(this, (this as any).c_textColor)
  }
}
