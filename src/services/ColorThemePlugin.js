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
  install (Vue, options) { // options = [ { name: 'myName', themes: { primary: '', ... }} ]
    const defaultOptions = getDefaultOptions()

    if (!options) {
      options = [{ name: 'default', ...defaultOptions }]
    }

    if (options && !Array.isArray(options)) {
      throw new Error('Options of ColorThemePlugin should be an array')
    }

    if (!options[0].name || !options[0].themes) {
      throw new Error('Options should have name and themes props')
    }

    const optionsThemesByName = options.reduce((result, { name, themes }) => ({
      ...result,
      [name]: Object.assign({}, defaultOptions.themes, themes),
    }), {})

    const defaultThemeName = options[0].name
    const defaultTheme = optionsThemesByName[defaultThemeName]

    Vue.prototype.$themes = Object.assign({}, defaultTheme) // clone default theme to themes

    Vue.prototype.$themesOptions = {
      activeThemeName: defaultThemeName,
      defaultThemeName: defaultThemeName,
      themesList: optionsThemesByName,
    }

    /* eslint-disable no-new */
    // This line is just to make fields reactive
    new Vue({ data: {
      themes: Vue.prototype.$themes,
      themesOptions: Vue.prototype.$themesOptions,
    } })
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
    isDefaultColorTheme () {
      return this.$themesOptions.activeThemeName === this.$themesOptions.defaultThemeName
    },
  },
}

export const ColorThemeActionsMixin = { // need for vuestic-admin for themes swither
  methods: {
    setTheme (themeName) {
      const newTheme = this.$themesOptions.themesList[themeName]

      this.$themesOptions.activeThemeName = themeName

      Object.keys(newTheme).forEach((color) => {
        this.$themes[color] = newTheme[color]
      })
    },
  },
}
