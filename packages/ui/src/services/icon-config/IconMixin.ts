import { prop, Vue } from 'vue-class-component'
import { getIconConfig } from './icon-config'

class IconMixinProps {
  name = prop<string>({ type: String, required: true })
  iconsConfig = prop<any>({ type: Object, default: {} })
}

function copyObjectWithoutUndefiend (obj: any) {
  return Object.keys({ ...obj }).reduce((acc, key) => {
    return obj[key] !== undefined ? { [key]: obj[key], ...acc } : acc
  }, {})
}

export class IconMixin extends Vue.with(IconMixinProps) {
  get icon () {
    const config = getIconConfig(this.name, this.iconsConfig)
    const props = copyObjectWithoutUndefiend(this.$props)
    return { ...config, ...props }
  }
}
