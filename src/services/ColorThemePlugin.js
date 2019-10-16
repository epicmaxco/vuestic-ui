const getDefaultOptions = () => ({
  themes: {
    primary: '#29c4a9',
    secondary: '#34f5d4',
    success: '#29c4a9',
    info: '#29c4a9',
    danger: '#e34b4a',
    warning: '#ffc200',
    gray: '#A49D97',
    dark: '#414244',
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
    // This allows a multitude of defaults.
    // theme color => color => theme default => hard default
    colorComputed () {
      return this.computeColor(this.color)
    },
  },
  methods: {
    computeColor (prop) {
      if (this.$themes && this.$themes[prop]) {
        return this.$themes[prop]
      }
      if (prop) {
        return prop
      }
      if (this.$themes && this.$themes[this.colorThemeDefault]) {
        return this.$themes[this.colorThemeDefault]
      }
      return this.colorDefault
    },
  },
}
