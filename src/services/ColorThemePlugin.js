import { originalTheme } from './themes'

export const ColorThemePlugin = {
  install (Vue, options) {
    Vue.prototype.$themes = Object.assign({}, originalTheme.colors, options)
    Vue.observable(Vue.prototype.$themes)
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
    // Pass colors to change global theme.
    setColors (colors) {
      Object.keys(colors).forEach((key) => {
        this.$themes[key] = colors[key]
      })
    },
  },
}
