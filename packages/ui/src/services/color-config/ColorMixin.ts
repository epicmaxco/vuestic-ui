import { prop, Vue, Options, setup } from 'vue-class-component'

import { getColor } from './color-config'

class Props {
  color = prop<string>({
    type: String,
    default: '',
  })
}

/** @deprecated */
@Options({})
class ColorMixin extends Vue.with(Props) {
  hasColorThemeMixin!: boolean

  created () {
    this.hasColorThemeMixin = true
  }

  theme = setup(() => {
    return {
      getColor,
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
