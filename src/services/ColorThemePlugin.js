import { makeContextablePropsMixin } from '../components/context-test/context-provide/ContextPlugin'

const getDefaultOptions = () => ({
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
// probably won't work with SSR
const isCssColor = strColor => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}

const getColor = ($vm, prop, defaultColor) => {
  if (isCssColor(prop)) {
    return prop
  }

  if ($vm.$themes && $vm.$themes[prop]) {
    return $vm.$themes[prop]
  }

  return defaultColor
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
      defaultColor: '#000',
      defaultInvertedColor: '#fff',
    }
  },
  computed: {
    colorComputed () {
      return this.computeColor(this.c_color)
    },
  },
  methods: {
    computeColor (prop) {
      return getColor(this, prop, this.defaultColor)
    },
    computeInvertedColor (prop) {
      return getColor(this, prop, this.defaultInvertedColor)
    },
  },
}
