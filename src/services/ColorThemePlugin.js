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
    if (!Array.isArray(options)) {
      throw new Error('Options of ColorThemePlugin should be an array')
    }

    if (!options[0].name || !options[0].themes) {
      throw new Error('Options should has name and themes props')
    }

    const defaultOptions = getDefaultOptions()

    const useVueSetToObject = (object) => {
      Object.keys(object).forEach((key) => {
        Vue.set(object, key, object[key])
      })

      return object
    }

    const optionsThemesByName = options.reduce((result, { name, themes }) => ({
      ...result,
      [name]: useVueSetToObject(Object.assign({}, defaultOptions.themes, themes)),
    }), {})

    const defaultTheme = optionsThemesByName[options[0].name]

    Vue.prototype.$themes = Object.assign({}, defaultTheme)
    Vue.prototype.$themesList = optionsThemesByName

    /* eslint-disable no-new */
    // This line is just to make themes reactive
    new Vue({ data: {
      themes: Vue.prototype.$themes,
      themesList: Vue.prototype.$themesList,
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
  },
}

export const ColorThemeActionsMixin = {
  methods: {
    setTheme (themeName) {
      const newTheme = this.$themesList[themeName]

      for (const key in newTheme) {
        this.$themes[key] = newTheme[key]
      }
    },
  },
}
