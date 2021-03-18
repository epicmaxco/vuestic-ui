import { prop, Vue } from 'vue-class-component'
import { getIconConfig } from './icon-config'
import { useGlobalConfig } from '../GlobalConfigPlugin'

class IconMixinProps {
  name = prop<string>({ type: String, required: true })
  iconsConfig = prop<any>({ type: Object, default: {} })
}

function copyObjectWithoutUndefined (obj: any) {
  return Object.keys({ ...obj }).reduce((acc, key) => {
    return obj[key] !== undefined ? { [key]: obj[key], ...acc } : acc
  }, {})
}

export class IconMixin extends Vue.with(IconMixinProps) {
  get icon () {
    const globalConfig = useGlobalConfig().getGlobalConfig()
    const iconsConfig = globalConfig.icons
    const config = getIconConfig(this.name, iconsConfig)
    const props = copyObjectWithoutUndefined(this.$props)
    return { ...config, ...props }
  }
}
