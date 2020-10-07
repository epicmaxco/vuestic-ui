import Vue from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../services/context/makeContextablePropsMixin'
import { DEFAULT_COLOR, themesRef } from '../../services/ColorThemePlugin'

const ContextableMixin = makeContextablePropsMixin({
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

export const getColor = ($vm: Vue, prop: string, defaultColor: string = DEFAULT_COLOR): string => {
  // We do not really want to absolutely keep this ref global, but it probably will do for 1.0.
  if (themesRef.value[prop]) {
    return themesRef.value[prop]
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
    return getColor(this, (this as any).c_color)
  }

  computeColor (prop: string, defaultColor?: string) {
    return getColor(this, prop, defaultColor)
  }

  created () {
    (this as any).hasColorThemeMixin = true
  }
}
