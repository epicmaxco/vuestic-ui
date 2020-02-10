import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'

export const getDefaultOptions = () => ({
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

export const ColorThemePlugin = {
  install (Vue, options = {}) {
    const defaultOptions = getDefaultOptions()

    if (options.themes) {
      Object.assign(defaultOptions.themes, options.themes)
    }

    Vue.prototype.$themes = Vue.observable(defaultOptions.themes)
  },
}

// https://stackoverflow.com/a/56266358/5783475
const isCssColor = strColor => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}

const getColor = ($vm, prop) => {
  if (isCssColor(prop)) {
    return prop
  }

  if ($vm.$themes && $vm.$themes[prop]) {
    return $vm.$themes[prop]
  }

  return null
}

const colorConfigMixin = makeContextablePropsMixin({
  color: {
    type: String,
  },
  dark: {
    type: Boolean,
  },
})

export const ColorThemeMixin = {
  mixins: [colorConfigMixin],
  computed: {
    colorComputed () {
      return this.computeColor(this.c_color)
    },
    themeClassComputed () {
      return {
        'light': !this.c_dark,
        'dark': this.c_dark,
      }
    },
  },
  methods: {
    computeColor (prop) {
      return getColor(this, prop)
    },
  },
}

const textColorConfigMixin = makeContextablePropsMixin({
  textColor: {
    type: String,
  },
})

export const TextColorThemeMixin = {
  mixins: [textColorConfigMixin],
  computed: {
    textColorComputed () {
      return getColor(this, this.c_textColor)
    },
  },
}
