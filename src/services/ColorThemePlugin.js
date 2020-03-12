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

// https://stackoverflow.com/a/56266358/5783475
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

export const ColorThemeMixin = {
  mixins: [makeContextablePropsMixin({
    color: {
      type: String,
    },
    dark: {
      type: Boolean,
    },
  })],
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
      return getColor(this, prop, null)
    },
    computeInvertedColor (prop) {
      return getColor(this, prop, this.defaultInvertedColor)
    },
  },
}

export const TextColorThemeMixin = {
  mixins: [makeContextablePropsMixin({
    textColor: {
      type: String,
    },
  })],
  computed: {
    textColorComputed () {
      return getColor(this, this.c_textColor)
    },
  },
}
