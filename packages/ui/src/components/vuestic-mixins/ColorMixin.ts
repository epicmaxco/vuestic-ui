import { Component, Vue, Prop } from 'vue-property-decorator'
import { DEFAULT_COLOR, useTheme } from '../../services/Theme'

// https://github.com/vuejs/composition-api/issues/136
Component.registerHooks(['setup'])

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

export const useColor = () => {
  const { getTheme = () => ({}) } = useTheme() as any || {}
  const theme = getTheme() || {}

  return (prop: string, defaultColor: string = DEFAULT_COLOR): string => {
    if (theme[prop]) {
      return theme[prop]
    }

    if (isCssColor(prop)) {
      return prop
    }

    return defaultColor
  }
}

/**
 * This mixin does not cover all needed color functionality for majority of components.
 * Its main purpose is raw code reuse.
 */
@Component
export class ColorThemeMixin extends Vue {
  @Prop() color!: string

  setup () {
    return {
      getColor: useColor(),
      hasColorThemeMixin: true,
    }
  }

  get colorComputed () {
    return (this as any).getColor(this.color)
  }

  computeColor (prop: string, defaultColor?: string) {
    return (this as any).getColor(prop, defaultColor)
  }
}
