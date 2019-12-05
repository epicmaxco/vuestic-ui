const getDefaultOptions = () => ({
  mode: 'original',
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

const getCorporateOptions = () => ({
  mode: 'corporate',
  themes: {
    primary: '#6E85E8',
    secondary: '#8396A5',
    success: '#8FDB8B',
    info: '#74BBFF',
    danger: '#F67170',
    warning: '#FFD55E',
    gray: '#babfc2',
    dark: '#34495E',
  },
})

export const ColorThemePlugin = {
  install (Vue, options) {
    Vue.prototype.$setMode = function (mode) {
      Vue.prototype.$mode = mode
    }
    const defaultOptions = getDefaultOptions()

    if (options && options.themes) {
      Object.assign(defaultOptions.themes, options.themes)
    }

    Vue.prototype.$themes = defaultOptions.themes
    Vue.prototype.$mode = defaultOptions.mode

    /* eslint-disable no-new */
    // This line is just to make themes reactive
    new Vue({ data: {
      themes: Vue.prototype.$themes,
      mode: Vue.prototype.$mode,
    } })
  },
}

export const ColorThemeMixin = {
  data () {
    return {
      colorThemeDefault: this.$mode === 'original' ? 'primary' : 'success',
      colorDefault: '#000000',
    }
  },
  props: {
    color: {
      type: String,
    },
  },
  computed: {
    // This allows a multitude of defaults.
    // theme color => color => theme default => hard default
    colorComputed () {
      if (this.$themes && this.$themes[this.color]) {
        return this.$themes[this.color]
      }
      if (this.color) {
        return this.color
      }
      if (this.$themes && this.$themes[this.colorThemeDefault]) {
        return this.$themes[this.colorThemeDefault]
      }
      return this.colorDefault
    },
  },
  methods: {
    setTheme (mode) {
      const options = mode === 'corporate' ? getCorporateOptions() : getDefaultOptions()
      for (const i in options.themes) {
        this.$themes[i] = options.themes[i]
      }
      this.$setMode(mode)
    },
  },
}
