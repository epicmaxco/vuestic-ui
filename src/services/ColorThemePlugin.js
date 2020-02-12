import Vue from 'vue'
import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'

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
  install (Vue, options) {
    if (options && options.themes) {
      defaultOptions.themes = { ...defaultOptions.themes, ...options.themes }
    }

    Vue.prototype.$themes = defaultOptions.themes
  },
}

const contextConfigMixin = makeContextablePropsMixin({
  color: {
    type: String,
  },
})

export const ColorThemeMixin = {
  mixins: [contextConfigMixin],
  data () {
    return {
      colorThemeDefault: 'primary',
      colorDefault: '#000000',
    }
  },
  computed: {
    _isEnableColorTheme () {
      return Boolean(this.$themes)
    },
    // This allows a multitude of defaults.
    // theme color => color => theme default => hard default
    colorComputed () {
      return this.computeColor(this.c_color)
    },
  },
  methods: {
    computeColor (prop) {
      if (this._isEnableColorTheme) {
        // Use color from global theme config.
        if (this.$themes && this.$themes[prop]) {
          return this.$themes[prop]
        }
      }

      if (prop) {
        // Assume prop is already proper color.
        return prop
      }

      if (this._isEnableColorTheme) {
        // Use theme default
        if (this.$themes && this.$themes[this.colorThemeDefault]) {
          return this.$themes[this.colorThemeDefault]
        }
      }

      // For case when theme is not present and prop is empty.
      return this.colorDefault
    },
  },
}
