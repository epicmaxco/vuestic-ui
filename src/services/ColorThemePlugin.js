const getDefaultOptions = () => ({
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
})

export const ColorThemePlugin = {
  install (Vue, options) {
    const defaultOptions = getDefaultOptions()

    if (options && options.themes) {
      Object.assign(defaultOptions.themes, options.themes)
    }

    Vue.prototype.$themes = defaultOptions.themes

    /* eslint-disable no-new */
    // This line is just to make themes reactive
    new Vue({ data: { themes: Vue.prototype.$themes } })
  },
}

export const ColorThemeMixin = {
  data () {
    return {
      colorThemeDefault: 'primary',
      colorDefault: '#000000',
    }
  },
  props: {
    color: {
      type: String,
    },
  },
  computed: {
    _isEnableColorTheme () {
      return this.$themes
    },
    // This allows a multitude of defaults.
    // theme color => color => theme default => hard default
    colorComputed () {
      return this.computeColor(this.color)
    },
  },
  methods: {
    computeColor (prop) {
      if (this._isEnableColorTheme) {
        if (this.$themes && this.$themes[prop]) {
          return this.$themes[prop]
        }
        if (this.$themes && this.$themes[this.colorThemeDefault]) {
          return this.$themes[this.colorThemeDefault]
        }
      }

      if (prop) {
        return prop
      }

      return this.colorDefault
    },
  },
}
