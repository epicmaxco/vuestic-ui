import { prop, Vue, Options, setup } from 'vue-class-component'

import { useTheme, DEFAULT_COLOR } from './Theme'

/**
 * Check if color is valid css color
 * Taken from https://stackoverflow.com/a/56266358/5783475
 * @param strColor
 */
export const isCssColor = (strColor: string): boolean => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}

export const useColor = () => {
  const { getTheme = () => ({}) } = useTheme() as any || {}
  const theme = getTheme() || {}

  return (prop?: string, defaultColor: string = DEFAULT_COLOR): string => {
    if (!prop) {
      return defaultColor
    }

    if (theme[prop]) {
      return theme[prop]
    }

    if (isCssColor(prop)) {
      return prop
    }

    return defaultColor
  }
}

class Props {
  color = prop<string>({
    type: String,
    default: '',
  })
}

@Options({})
class ColorMixin extends Vue.with(Props) {
  hasColorThemeMixin!: boolean

  created () {
    this.hasColorThemeMixin = true
  }

 theme = setup(() => {
   return {
     getColor: useColor(),
   }
 })

 get colorComputed () {
   return this.theme.getColor(this.color)
 }

 computeColor (prop: string, defaultColor?: string) {
   return this.theme.getColor(prop, defaultColor)
 }
}

export default ColorMixin
