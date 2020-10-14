import { Component, Mixins } from 'vue-property-decorator'
import { makeConfigTransportMixin } from '../../services/config-transport/makeConfigTransportMixin'
import { DEFAULT_COLOR, getTheme } from '../../services/Theme'

const ContextableMixin = makeConfigTransportMixin({
  color: {
    type: String,
  },
})

/**
 * Check if color is valid css color
 * Taken from https://stackoverflow.com/a/56266358/5783475
 * Please note that it requires either jsdom or browser environment to function properly. That's intended.
 * @param strColor
 */
export const isCssColor = (strColor: string): boolean => {
  const style = new Option().style
  style.color = strColor
  return style.color !== ''
}

export const getColor = (prop: string, defaultColor: string = DEFAULT_COLOR): string => {
  const theme = getTheme() || {}

  if (theme[prop]) {
    return theme[prop]
  }

  if (isCssColor(prop)) {
    return prop
  }

  return defaultColor
}

/**
 * This mixin does not cover all needed color functionality for majority of components.
 * Its main purpose is raw code reuse.
 */
@Component
export class ColorThemeMixin extends Mixins(ContextableMixin) {
  get colorComputed () {
    return getColor((this as any).c_color)
  }

  computeColor (prop: string, defaultColor?: string) {
    return getColor(prop, defaultColor)
  }

  created () {
    (this as any).hasColorThemeMixin = true
  }
}
